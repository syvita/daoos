(define-constant CONTRACT_OWNER tx-sender)

;; Stores roles granted to users
;; Each user can have up to 128 roles ranging from 0-127.
;; Roles are stored as bitmask values represented as uint's.
(define-map UserRoles
  {user: principal}
  {roles: uint}
)

;; Stores the roles granted to permissions
;; Each permission can be granted to up to 128 roles ranging from 0-127
;; Roles are stored as bitmask values represented as uint's.
(define-map PermissionRoles
  {permission: (string-ascii 50)}
  {roles: uint}
)

;; Returns all roles granted to specific user
;; Returns u0 if user is unknown (has no roles granted)
(define-read-only (get-roles (user principal)) 
  (default-to u0 (get roles (map-get? UserRoles {user: user})))
)

;; Checks if user have granted a specific role 
(define-read-only (has-role (user principal) (role uint))
  (begin 
    (asserts! (> u128 role) false)
    (let
      (
        (currentRoles (get-roles user))
        (searchRole (pow u2 role))
      )
      (> currentRoles (xor currentRoles searchRole))
    )
  )
)

;; Allows to grant a role to user
;; Throws an error if :
;; - caller doesn't have role with granted "grant-role" permission, 
;; - provided role is not in range 0-127
;; - user already have specified role
(define-public (grant-role (user principal) (role uint))
  (begin
    (asserts! (can-execute tx-sender "grant-role") (err "Unauthorized"))
    (asserts! (> u128 role) (err "Role is out of range 0-127"))
    (asserts! (not (has-role user role)) (err "Role already granted"))
    (let
      (
        (currentRoles (get-roles user))
        (newRole (pow u2 role))
      )
      (map-set UserRoles
        {user: user}
        {roles: (+ currentRoles newRole)}
      )
      (ok true)
    )
  )
)

;; Allows to revoke a role from user
;; Throws an error if :
;; - caller doesn't have role with granted "revoke-role" permission, 
;; - provided role is not in range 0-127
;; - user already have specified role
(define-public (revoke-role (user principal) (role uint))
  (begin
    (asserts! (can-execute tx-sender "revoke-role") (err "Unauthorized"))
    (asserts! (> u128 role) (err "Role is out of range 0-127"))
    (asserts! (has-role user role) (err "Role already revoked"))
    (let
      (
        (currentRoles (get-roles user))
        (revokedRole (pow u2 role))
      )
      (map-set UserRoles
        {user: user}
        {roles: (- currentRoles revokedRole)}
      )
      (ok true)
    )
  )
)

;; Returns all roles with specyfic permission
;; Returns u0 if persmission have not been granted to any role (unknow permission)
(define-read-only (get-permitted-roles (permission (string-ascii 50)))
  (default-to u0 (get roles (map-get? PermissionRoles {permission: permission})))
)

;; Checks if role have specyfic permission
(define-read-only (has-permission (role uint) (permission (string-ascii 50)))
  (begin 
    (asserts! (> u128 role) false)
    (let
      (
        (currentRoles (get-permitted-roles permission))
        (searchRole (pow u2 role))
      )
      (> currentRoles (xor currentRoles searchRole))
    )
  )
)

;; Allows to grant a permission to role
;; Throws an error if :
;; - caller doesn't have role with granted "grant-permission" permission, 
;; - provided role is not in range 0-127
;; - permision have been already granted to a specified role
(define-public (grant-permission (permission (string-ascii 50)) (role uint))
  (begin
    (asserts! (can-execute tx-sender "grant-permission") (err "Unauthorized"))
    (asserts! (> u128 role) (err "Role is out of range 0-127"))
    (asserts! (not (has-permission role permission)) (err "Permission already granted"))
    (let
      (
        (currentRoles (get-permitted-roles permission))
        (newRole (pow u2 role))
      )
      (map-set PermissionRoles
        {permission: permission}
        {roles: (+ currentRoles newRole)}
      )
      (ok true)
    )
  )
)

;; Allows to revoke a permission from role
;; Throws an error if :
;; - caller doesn't have role with granted "revoke-permission" permission, 
;; - provided role is not in range 0-127
;; - permision have been already revoked from specified role
(define-public (revoke-permission (permission (string-ascii 50)) (role uint))
  (begin
    (asserts! (can-execute tx-sender "revoke-permission") (err "Unauthorized"))
    (asserts! (> u128 role) (err "Role is out of range 0-127"))
    (asserts! (has-permission role permission) (err "Permission already revoked"))
    (let
      (
        (currentRoles (get-permitted-roles permission))
        (revokedRole (pow u2 role))
      )
      (map-set PermissionRoles
        {permission: permission}
        {roles: (- currentRoles revokedRole)}
      )
      (ok true)
    )
  )
)

;; Checks if user have at lease one role granted with specified permission.
(define-read-only (can-execute (user principal) (permission (string-ascii 50)))
  (begin
    (asserts! (not (is-eq CONTRACT_OWNER user)) true)
    (let
      (
        (permittedRoles (get-permitted-roles permission))
        (userRoles (get-roles user))
      )
      (asserts! (< u0 permittedRoles) false)  ;; false if permission is not granted to any role (permission is uknown)
      (asserts! (< u0 userRoles) false)       ;; false if user have no roles granted (unknown user)
      (> permittedRoles (xor permittedRoles userRoles))
    )
  )
)

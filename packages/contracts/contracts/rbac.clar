(define-constant ERR_UNAUTHORIZED (err u401))
(define-constant ERR_ROLE_OUT_OF_RANGE (err u1001))
(define-constant ERR_ROLE_ALREADY_GRANTED (err u1002))
(define-constant ERR_ROLE_NOT_FOUND (err u1003))
(define-constant ERR_PERMISSION_ALREADY_GRANTED (err u1004))
(define-constant ERR_PERMISSION_NOT_FOUND (err u1005))

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

;; Returns all roles granted to a specific user
;; Returns u0 if user is unknown (has no roles granted)
(define-read-only (get-roles (user principal)) 
  (default-to u0 (get roles (map-get? UserRoles {user: user})))
)

;; Checks if user has a specified role
(define-read-only (has-role (user principal) (role uint))
  (begin 
    (asserts! (> u128 role) false)
    (let
      (
        (currentRoles (get-roles user))
      )
      (contains currentRoles role)
    )
  )
)

;;
(define-read-only (contains (currentRoles uint) (role uint))
  (begin
    (asserts! (> u128 role) false)
    (let
      (
        (searchRole (pow u2 role))
      )
      (> currentRoles (xor currentRoles searchRole))
    )
  )
)

;; Grant a role to a user.
;; Throws an error if :
;; - caller doesn't have role with granted "grant-role" permission, 
;; - provided role is not in range 0-127
;; - user already has specified role
(define-public (grant-role (user principal) (role uint))
  (begin
    (asserts! (can-execute tx-sender "grant-role") ERR_UNAUTHORIZED)
    (asserts! (> u128 role) ERR_ROLE_OUT_OF_RANGE)
    (asserts! (not (has-role user role)) ERR_ROLE_ALREADY_GRANTED)
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

;; Revoke a role from a user.
;; Throws an error if :
;; - caller doesn't have role with granted "revoke-role" permission, 
;; - provided role is not in range 0-127
;; - user already has specified role
(define-public (revoke-role (user principal) (role uint))
  (begin
    (asserts! (can-execute tx-sender "revoke-role") ERR_UNAUTHORIZED)
    (asserts! (> u128 role) ERR_ROLE_OUT_OF_RANGE)
    (asserts! (has-role user role) ERR_ROLE_NOT_FOUND)
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

;; Returns all roles that possess a specific permission
;; Returns u0 if permission has not been granted to any role (unknown permission)
(define-read-only (get-permitted-roles (permission (string-ascii 50)))
  (default-to u0 (get roles (map-get? PermissionRoles {permission: permission})))
)

;; Checks if a role has a specific permission
(define-read-only (has-permission (role uint) (permission (string-ascii 50)))
  (begin 
    (asserts! (> u128 role) false)
    (let
      (
        (currentRoles (get-permitted-roles permission))
      )
      (contains currentRoles role)
    )
  )
)

;; Grant a permission to a role.
;; Throws an error if :
;; - caller doesn't have role with granted "grant-permission" permission, 
;; - provided role is not in range 0-127
;; - permission has already been granted to the specified role
(define-public (grant-permission (permission (string-ascii 50)) (role uint))
  (begin
    (asserts! (can-execute tx-sender "grant-permission") ERR_UNAUTHORIZED)
    (asserts! (> u128 role) ERR_ROLE_OUT_OF_RANGE)
    (asserts! (not (has-permission role permission)) ERR_PERMISSION_ALREADY_GRANTED)
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

;; Revoke a permission from a role.
;; Throws an error if :
;; - caller doesn't have role with granted "revoke-permission" permission, 
;; - provided role is not in range 0-127
;; - permission does not exist for role
(define-public (revoke-permission (permission (string-ascii 50)) (role uint))
  (begin
    (asserts! (can-execute tx-sender "revoke-permission") ERR_UNAUTHORIZED)
    (asserts! (> u128 role) ERR_ROLE_OUT_OF_RANGE)
    (asserts! (has-permission role permission) ERR_PERMISSION_NOT_FOUND)
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

;; Checks if user has at least one role granted with a specified permission.
(define-read-only (can-execute (user principal) (permission (string-ascii 50)))
  (begin
    (asserts! (not (is-eq CONTRACT_OWNER user)) true)
    (let
      (
        (permittedRoles (get-permitted-roles permission))
        (userRoles (get-roles user))
      )
      (asserts! (< u0 permittedRoles) false)  ;; false if permission is not granted to any role (permission is unknown)
      (asserts! (< u0 userRoles) false)       ;; false if user doesn't have any roles (unknown user)
      (> permittedRoles (xor permittedRoles userRoles))
    )
  )
)

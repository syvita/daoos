(define-map UserRoles
  {user: principal}
  {roles: uint}
)


(define-read-only (get-roles (user principal)) 
  (default-to u0 (get roles (map-get? UserRoles {user: user})))
)


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


(define-public (grant-role (user principal) (role uint))
  (begin
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


(define-public (revoke-role (user principal) (role uint))
  (begin
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
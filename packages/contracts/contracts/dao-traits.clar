;; dao-registry-trait
;; Registry interface for DAO's to implement
;; Traits cannot be defined as read-only functions, auditing will be extra important here
(define-trait dao-registry-trait
  (
    (get-dao-registry-version () (response (string-ascii 256) uint))

    ;; Could be a call to BNS contract? String length arbitrary for now
    ;; A BNS standard would be nice to avoid conflicting DAO names.
    (get-dao-name () (response (string-ascii 256) uint) )

    (set-dao-name ((string-ascii 256)) (response (string-ascii 256) uint))

    (add-dao-member (principal (string-ascii 256)) (response principal uint))

    (remove-dao-member (principal) (response principal uint))

    (is-dao-member (principal) (response bool uint))
  )
)
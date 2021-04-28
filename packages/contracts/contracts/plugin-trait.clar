(define-trait plugin-trait 
  (
    (get-name () (response (string-ascii 50) bool))
    (get-version () (response uint bool))
  )
)
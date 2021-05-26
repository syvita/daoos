(define-trait plugin-trait 
  (
    (get-name () (response (string-ascii 50) uint))
    (get-version () (response uint uint))
  )
)

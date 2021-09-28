;; Daoos Vote
;; <contract to manage daoos voting>

;; constants
;;
(define-constant ERROR_YOU_CAN_ONLY_VOTE_ONCE u0)

;; data maps and vars
;;
(define-map vote-state
    {voter: principal}
    {
        proposal-id: (string-ascii 40),
        is-yes: bool,
        name:  (string-ascii 50)),
        email: (optional (string-utf8 60)),
        id: (string-ascii 40)
    }
)



;; private functions
;; 
;; private method to check if voter has voted previously
(define-private (member-has-cast-a-vote)
    (begin
        (if (is-some (map-get? vote-state {voter: tx-sender})) false true)
    )    
)

;; public functions
;; 
;; public method to cast a vote
(define-public (cast-vote 
    (proposal-id (string-ascii 40))
    (ballot bool) 
    (name (string-ascii 50))
    (email (optional(string-utf8 60)))
    (id (string-ascii 40))
    (begin
        (asserts! (member-has-cast-a-vote) (err ERROR_YOU_CAN_ONLY_VOTE_ONCE))
        (map-insert vote-state {voter: tx-sender}
            {proposal-id: proposal-id,is-yes: ballot,name: name, email: email,id: id}
        )
        (ok true)
    )
)


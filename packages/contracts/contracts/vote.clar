;; Daoos Vote
;; <contract to manage daoos voting>

;; constants
;;
(define-constant ERROR_YOU_CAN_ONLY_VOTE_ONCE u0)

;; data maps and vars
;;


(define-map vote-state

    {proposal-id: (string-utf8 80)}
    {
        voter: principal,
        is-yes: bool,
        name:  (string-ascii 50),
        email: (string-utf8 60)
    }
)

;; private functions
;; 
;; private method to get voter of a proposal
(define-private (find-voter-by-proposal (proposalId (string-utf8 80)))
    (begin 
        (get voter (map-get? vote-state (tuple (proposal-id proposalId))))
    )
)


;; public functions
;; 

;; read-only functions
;;
(define-read-only (member-has-not-cast-a-vote (proposalId (string-utf8 80)))
    (begin
       (is-none (find-voter-by-proposal proposalId)) 
    )    
)


;; public method to cast a vote
(define-public (cast-vote 
    (proposalId (string-ascii 40))
    (ballot bool) 
    (name (string-ascii 50))
    (email (string-utf8 60)))
    (let ((propId (concat proposalId tx-sender)))
        (asserts! (member-has-not-cast-a-vote propId) (err ERROR_YOU_CAN_ONLY_VOTE_ONCE))
        (map-insert vote-state {proposal-id: propId}
            {voter: tx-sender,is-yes: ballot,name: name, email: email}
        )
        (ok true)
    )
   
)
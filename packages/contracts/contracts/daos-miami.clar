;; daos-miami
;; This contract is an implementation of a DAO registry for Miami coin holders.
;; It maintains a registry of members and information about the DAO with operations to manipulate its state.
;; Modification of state is only permitted if the tx-sender is a passed proposal.
;; We trust a "core-proposal-contract" to be our arbiter of truth as to which proposals are "passed".
;; We delegate proposal management responsibilities to this separate core contract to adhere to
;; the "single responsibility principle"
;;
;; Anyone can be added by anyone to the DAO as a member (including prospective members admitting themselves)
;; as long as they have a token balance > 0 and haven't been blacklisted. Blacklisting is admittedly
;; a negligable impediment for this form of membership admission since a user can just create a new wallet.
;; However, it may be better to have than not have as well as demonstrate utility for other DAO implementations

;; Devnet
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.dao-traits.dao-registry-trait)

;; constants
(define-constant ERR_UNAUTHORIZED u401) ;; to be used with core-proposal-contract calls
(define-constant ERR_MEMBER_NOT_FOUND u404)
(define-constant ERR_EMPTY_STRING u100)
(define-constant ERR_NO_MIA_BALANCE u101)
(define-constant ERR_MEMBER_EXISTS u102)
(define-constant ERR_BLACKLISTED_PRINCIPAL u103)
(define-constant ERR_BLACKLIST_OR_ZERO_BALANCE_REQUIRED u104)

;; data maps and vars
(define-data-var dao-name (string-ascii 256) "Miami")
(define-data-var number-of-dao-members uint u0)
(define-data-var number-of-historical-dao-members uint u0) ;; won't be decremented when a member is removed
;; A trusted contract used for voting on the initiation of other proposals and maintaining
;; state of pending, passed, historical, etc. proposals. Must be deployed before this contract. 
;; This is currently set to an arbitrary fake principal
(define-data-var core-proposal-contract principal 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6)

(define-map blacklisted-principals { address: principal } { blacklist-reason: (string-ascii 256) })
;; Couldn't use a list due to storage constraints so "name" can be whatever.
(define-map dao-members { member: principal } { name: (string-ascii 256) })

;; Some read-only functions like this one return a response type
;; only because these are functions implementing a trait and as of
;; the time of writing Clarity traits don't support specification
;; of read-only functions
;;
;; (Major.Minor.Patch)
;; major - increment in new contract with breaking change
;; minor - increment in new contract with non-breaking new feature
;; Patch - increment in new contract with non-breaking bug fix
;; New contract deployments should have a change log.
;;
;; We also need a formal upgrade policy where we can maintain or port
;; state through some proxying method or similar design pattern.
;; Therefore, this contract will likely change when that is fleshed out.
(define-read-only (get-dao-registry-version)
    (ok "1.0.0") ;; When it hits mainnet we'll call that "released" so starting with v1 here.
)

(define-read-only (get-dao-name)
    (ok (var-get dao-name))
)

(define-read-only (is-principal-blacklisted (address principal))
    (is-some 
        (map-get? blacklisted-principals {address: address})
    )
)

(define-read-only (get-core-proposal-contract)
    (var-get core-proposal-contract)
)

(define-read-only (is-dao-member (user principal))
    (ok
        (is-some
            (map-get? dao-members {member: user})
        )
    )
)

(define-read-only (get-number-of-dao-members)
    (var-get number-of-dao-members)
)

;; historically admitted number
(define-read-only (get-number-of-historical-dao-members)
    (var-get number-of-historical-dao-members)
)

(define-read-only (get-member-name (member-address principal))
    (map-get? dao-members {member: member-address})
)

(define-public (set-core-proposal-contract (new-core-proposal-contract principal))
    (begin
        ;; TODO: call core-proposal-contract and verify tx-sender is a passed proposal

        (var-set core-proposal-contract new-core-proposal-contract)
        (ok new-core-proposal-contract)
    )
)

(define-public (set-dao-name (new-dao-name (string-ascii 256)))
    (begin
        ;; TODO: call core-proposal-contract and verify tx-sender is a passed proposal

        (asserts! (> (len new-dao-name) u0) (err ERR_EMPTY_STRING))
        ;; should have an additional error code for already registered name
        ;; (if we were using a registry)

        (var-set dao-name new-dao-name)
        (ok new-dao-name)
    )
)

(define-public (set-member-name (member principal) (new-member-name (string-ascii 256)))
    (begin
        (asserts! (is-eq member tx-sender) (err ERR_UNAUTHORIZED)) ;; Can only change your own name
        (asserts! (> (len new-member-name) u0) (err ERR_EMPTY_STRING))
        (ok (map-set dao-members {member: member} {name: new-member-name}))
    )
)

(define-public (add-dao-member (member-to-add principal) (name (string-ascii 256)))
    (begin
        (asserts! (not (unwrap-panic (is-dao-member member-to-add))) (err ERR_MEMBER_EXISTS))
        (asserts! (not (is-principal-blacklisted)) (err ERR_BLACKLISTED_PRINCIPAL))
        (asserts! (> (len name) u0) (err ERR_EMPTY_STRING))
        (let ((balance (unwrap-panic (get-user-mia-ft-balance member-to-add))))
            (asserts! (> balance u0) (err ERR_NO_MIA_BALANCE))
            (map-insert dao-members {member: member-to-add} {name: name})
        )
        (var-set number-of-dao-members (+ (var-get number-of-dao-members) u1))
        (var-set number-of-historical-dao-members (+ (var-get number-of-historical-dao-members) u1))
        (ok member-to-add)
    )
)

(define-public (remove-dao-member (member-to-remove principal))
    (begin
        ;; TODO: call core-proposal-contract and verify tx-sender is a passed proposal

        (asserts! (unwrap-panic (is-dao-member member-to-remove)) (err ERR_MEMBER_NOT_FOUND))
        (let ((balance (unwrap-panic (get-user-mia-ft-balance member-to-remove))))
            (asserts!
                (or
                    (is-principal-blacklisted member-to-remove)
                    (is-eq balance u0)
                )
                (err ERR_BLACKLIST_OR_ZERO_BALANCE_REQUIRED)
            )
        )
        (map-delete dao-members {member: member-to-remove})
        (var-set number-of-dao-members (- (var-get number-of-dao-members) u1))
        (ok member-to-remove)
    )
)

(define-public (blacklist-principal (address principal) (reason (string-ascii 256)))
    (begin
        ;; TODO: call core-proposal-contract and verify tx-sender is a passed proposal

        (map-insert blacklisted-principals {address: address} {blacklist-reason: reason})
        (is-err (remove-dao-member address))
        (ok address)
    )
)

(define-public (remove-from-blacklist (blacklisted-address principal))
    (begin
        ;; TODO: call core-proposal-contract and verify tx-sender is a passed proposal

        (asserts! (not (is-principal-blacklisted blacklisted-address)) (err ERR_MEMBER_NOT_FOUND))
        (map-delete blacklisted-principals {address: blacklisted-address})
        (ok blacklisted-address)
    )
)

;; 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token (mainnet miamicoin-token contract)
(define-private (get-user-mia-ft-balance (user principal))
    ;; devnet local contract address
    (as-contract (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.miamicoin-token get-balance user))
)
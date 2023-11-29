# Payment

## Success case

1. Payment was successful
2. System return payload

## Exception - Attempted merchant transfer

1. System return error

## Exception - Transfer to non-existent client

1. System return error

## Exception - System inconsistences

1. The transfer is halted
2. The transaction is rollback
3. System return error

## Exception - Insufficient balance

1. The balance is unchanged
1. System return error

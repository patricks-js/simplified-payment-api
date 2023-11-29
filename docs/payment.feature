Feature: Payment

  Tranfers operations between clients (customers and merchants)

  Scenario: Successful Transfer from customer to customer or merchaint (client)

    Given that client A has sufficient balance in their account
    And client B is a valid receipt
    When client A initiates a transfer to client B
    Then the system checks the balance of client A
    And the transfer is successfully completed
    And the balance of client A is deducted
    And the balance of client B is updated
    And client B receives a notification email as a receipt

  Scenario: Attempted transfer with insufficient balance

    Given that client A has an insufficient balance in their account
    And client B is a valid receipt
    When client A initiates a transfer to client B
    Then the system checks the balance of client A
    And the transfer is halted due to insufficient balance
    And the balance of client A and client B remains unchanged

  Scenario: Attempted merchant transfer

    Given that merchant A has a sufficient balance in their account.
    And client B is a valid recipient.
    When merchant A initiates a transfer to client B.
    Then the system checks the balance of merchaint A.
    And the transfer is halted as merchants cannot transfer to common clients.
    And the balance of merchaint A remains unchanged.

  Scenario: Transfer to non-existent client

    Given that client A is initiating a transfer
    And client D is an invalid recipient as they do not exist in the system
    When client A initiates the transfer to client D
    Then the system identifies that the recipient doesn't exist
    And the transfer is halted
    And the balance of client A remains unchanged

  Scenario: Automatic Reversal of Transaction with Issues

    Given that client A initiated a transfer to client B
    And a failure occurred during the transaction
    When the system detects the inconsistency
    Then the transaction is automatically reversed
    And the balance of client A is restored
    And the balance of client B remains unchanged

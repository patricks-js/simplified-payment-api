Feature: Authentication

  Simples user authentication

  Scenario: Authentication successfully

    Given that a valid user exists in the system
    When the user submits their authentication credentials (email and password) to the system
    Then the system validates the credentials
    And generates a token for the user
    And returns the token to the user

  Scenario: Invalid Authentication Attempt

    Given that a valid user exists in the system
    When the user submits invalid credentials (incorrect username or password) to the system
    Then the system rejects the credentials
    And returns an error message

  Scenario: Expired Token

    Given that a valid user exists in the system
    When the user submits their authentication credentials to the system
    And the system generates a token with a short expiration time (e.g., 1 minute)
    Then the system returns a token
    And the token expires after the specified time

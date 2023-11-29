Feature: Registration

  Simple user registration

  Scenario: Successful User Registration

    Given the user is requests to register.
    When the user provides a valid Full Name, unique Registration, valid Email, and a secure Password.
    Then the system validates the provided information.
    And the system creates a new user account.
    And the user receives a confirmation email.

  Scenario: Registration with Duplicate Email

    Given the user is requests to register.
    And a user with the same Email already exists in the system.
    When the user provides a valid Full Name, unique Registration, existing Email, and a secure Password.
    Then the system validates the provided information.
    And notifies the user that the Email is already in use.

  Scenario: Registration with Invalid Email Format

    Given the user is requests to register.
    When the user provides a valid Full Name, unique Registration, invalid Email format, and a secure Password.
    Then the system validates the provided information.
    And notifies the user that the Email format is invalid.

  Scenario: Registration with Weak Password

    Given the user is requests to register.
    When the user provides a valid Full Name, unique Registration, valid Email, and a weak Password.
    Then the system validates the provided information.
    And notifies the user that the Password is too weak.

  Scenario: Registration with Missing Information

    Given the user is requests to register.
    When the user submits the registration form with missing information (e.g., Full Name, Registration, Email, or Password).
    Then the system validates the provided information.
    And notifies the user about the missing information.

  Scenario: Registration with Existing Registration Number

    Given the user is requests to register.
    And a user with the same Registration Number already exists in the system.
    When the user provides a valid Full Name, existing Registration, valid Email, and a secure Password.
    Then the system validates the provided information.
    And notifies the user that the Registration Number is already in use.
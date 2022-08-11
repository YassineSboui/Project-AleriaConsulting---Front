import { gql } from "@apollo/client";

export const PASSWORD_GRANT = gql`
  mutation password_grant(
    $password: String
    $username: String
    $client_id: String
    $client_secrect: String
  ) {
    password_grant(
      password: $password
      username: $username
      client_id: $client_id
      client_secrect: $client_secrect
    ) {
      access_token
      refresh_token
      expires_in
      client {
        clientId
        clientSecret
        scope
      }
      user {
        auth_user_id
        first_name
        last_name
        _id
        is_activated
        birth_date
        activation_code
        phone_num
        e_mail
        role
        company_id
        is_enabled
      }
    }
  }
`;
// Authentication
export const CLIENT_USER_REGISTRATION = gql`
  mutation insert_client_user($password: String, $username: String) {
    client_and_user(password: $password, username: $username) {
      clientId
      clientSecret
      scope
      name
      username
      user
    }
  }
`;

export const CLIENT_COMPANY_REGISTRATION = gql`
  mutation insert_Company_user($company: company) {
    insertCompany(company: $company) {
      _id
      name
      phone
      trade_register_number
      e_mail
    }
  }
`;

export const SIGN_UP = gql`
  mutation insertUser($user: user) {
    insertNewUser(user: $user) {
      first_name
      last_name
      _id
      birth_date
      phone_num
      e_mail
      activation_code
      auth_user_id
      role
    }
  }
`;
export const LOG_OUT = gql`
  mutation log_out($token: String, $refresh: String) {
    logOut(token: $token, refresh: $refresh)
  }
`;
export const INSERT_PANEL = gql`
  mutation insertPanel($panel: panel) {
    insertPanel(panel: $panel) {
      _id
    }
  }
`;

export const INSERT_REQUEST = gql`
  mutation insertRequest($request: request) {
    insertRequest(request: $request) {
      _id
    }
  }
`;

export const UPDATE_REQUEST = gql`
  mutation upadteRequest($request_update: request_update) {
    updateRequest(request_update: $request_update) {
      _id
    }
  }
`;
export const CHECK_PANEL_AVAILABILITY = gql`
  mutation checkPanelAvailability(
    $panel_update: panel_update
    $ending_date: String
    $starting_date: String
  ) {
    checkPanelAvailability(
      panel_update: $panel_update
      ending_date: $ending_date
      starting_date: $starting_date
    ) {
      starting_date
      ending_date
      total_price
      days_number
      panel_id
      company_id
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($user_id: ID, $user: user_update) {
    UpdateUser(user_id: $user_id, user: $user) {
      _id
      activation_code
      auth_user_id
      birth_date
      company_id
      e_mail
      first_name
      last_name
      password
      created_at
      is_enabled
      phone_num
    }
  }
`;

export const UPDATE_PANEL = gql`
  mutation updatePanel($panel_update: panel_update) {
    updatePanel(panel_update: $panel_update) {
      _id
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation updateCompany($company_update: company_update) {
    updateCompany(company_update: $company_update) {
      _id
      e_mail
      name
      phone
      trade_register_number
    }
  }
`;
export const CONTACT_MAIL = gql`
  mutation sendContactMail(
    $email_sender: String
    $message: String
    $phone_sender: String
    $nom_complet: String
  ) {
    sendContactMail(
      email_sender: $email_sender
      message: $message
      phone_sender: $phone_sender
      nom_complet: $nom_complet
    )
  }
`;

export const RESEND_ACTIVATION_CODE = gql`
  mutation sendActivationCode($e_mail: String, $activation_code: String) {
    sendActivationCode(e_mail: $e_mail, activation_code: $activation_code)
  }
`;

export const UPDATE_NOTIFICATION = gql`
  mutation updateNotification($notification_update: notification_update) {
    updateNotification(notification_update: $notification_update) {
      _id
    }
  }
`;

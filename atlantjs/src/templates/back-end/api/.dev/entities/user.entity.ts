export const userEntity = {
  first_name: {
    type: 'string',
    required: true,
  },
  last_name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  password_hash: {
    type: 'string',
    required: true,
  },
  photo_profile: {
    type: 'string',
  },
  date_birth: {
    type: Date,
  },
  phone_number: {
    type: 'string',
    required: true,
    unique: true,
  },
  country: {
    type: 'string',
    required: true,
  },
  state: {
    type: 'string',
    required: true,
  },
  group: {
    type: 'string',
    required: true,
    enum: ['admin', 'pro-plan', 'free-plan'],
  },
  date_last_login: {
    type: 'string',
  },
  locale_last_login: {
    type: 'string',
  },
  account_status: {
    type: 'string',
    required: true,
    enum: ['active', 'disabled', 'waiting_deleted'],
    default: 'active',
  },
}

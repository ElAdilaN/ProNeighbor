export const environment = {
  api_url_login: 'http://localhost:3000/api/auth/login',
  api_url_register: 'http://localhost:3000/api/auth/register',
  api_url_GetProfileInfo: 'http://localhost:3000/api/user/profile',
  api_url_GetProfileInfoById: 'http://localhost:3000/api/user/userById/',
  api_url_PutProfileInfo: 'http://localhost:3000/api/user/profile',
  api_url_GetAllCategories: 'http://localhost:3000/api/services/categories',
  api_url_CreateService: 'http://localhost:3000/api/services',
  api_url_GetAllServices: 'http://localhost:3000/api/services',
  api_url_GetAllServicesByProvider:
    'http://localhost:3000/api/services/ByProvider/',
  api_url_GetAllReviewsForService: 'http://localhost:3000/api/reviews/service/',
  api_url_GetAllReviewsForUser: 'http://localhost:3000/api/reviews/my-reviews',
  api_url_UpdateReview: 'http://localhost:3000/api/reviews/',
  api_url_DeleteReview: 'http://localhost:3000/api/reviews/',
  api_url_AddReview: 'http://localhost:3000/api/reviews',
  api_url_GetServiceById: 'http://localhost:3000/api/services/',
  api_url_CreateChat: 'http://localhost:3000/api/messages/chat',
  api_url_GetChatsForUser: 'http://localhost:3000/api/messages/chats',
  api_url_GetMessagesForChat: 'http://localhost:3000/api/messages/chat/', // <-- Add this
  api_url_SendMessage: 'http://localhost:3000/api/messages/message', // <-- Add this
  api_url_GetAllUsers: 'http://localhost:3000/api/user/GetAllUsers', // <-- Add this
  api_url_AddParticipant: 'http://localhost:3000/api/messages/chat/participant', // <-- Add this
  api_url_GetChatInfo: 'http://localhost:3000/api/messages/ChatInfo/', // <-- Add this
};

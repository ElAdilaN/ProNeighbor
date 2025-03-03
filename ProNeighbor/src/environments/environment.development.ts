const api_url_main = 'http://localhost:3000/';

export const environment = {
  api_url_main,

  api_url_login: `${api_url_main}api/auth/login`,
  api_url_register: `${api_url_main}api/auth/register`,
  api_url_GetProfileInfo: `${api_url_main}api/user/profile`,
  api_url_GetProfileInfoById: `${api_url_main}api/user/userById/`,
  api_url_PutProfileInfo: `${api_url_main}api/user/profile`,
  api_url_GetAllCategories: `${api_url_main}api/services/categories`,
  api_url_CreateService: `${api_url_main}api/services`,
  api_url_GetAllServices: `${api_url_main}api/services`,
  api_url_GetAllServicesByProvider: `${api_url_main}api/services/ByProvider/`,
  api_url_GetAllReviewsForService: `${api_url_main}api/reviews/service/`,
  api_url_GetAllReviewsForUser: `${api_url_main}api/reviews/my-reviews`,
  api_url_UpdateReview: `${api_url_main}api/reviews/`,
  api_url_DeleteReview: `${api_url_main}api/reviews/`,
  api_url_AddReview: `${api_url_main}api/reviews`,
  api_url_GetServiceById: `${api_url_main}api/services/`,
  api_url_CreateChat: `${api_url_main}api/messages/chat`,
  api_url_GetChatsForUser: `${api_url_main}api/messages/chats`,
  api_url_GetMessagesForChat: `${api_url_main}api/messages/chat/`,
  api_url_SendMessage: `${api_url_main}api/messages/message`,
  api_url_GetAllUsers: `${api_url_main}api/user/GetAllUsers`,
  api_url_AddParticipant: `${api_url_main}api/messages/chat/participant`,
  api_url_GetChatInfo: `${api_url_main}api/messages/ChatInfo/`,
};

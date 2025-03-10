-- Switch to master database
USE master;

-- Create the database ProNeighbor2
CREATE DATABASE ProNeighbor2 COLLATE Latin1_General_CI_AS;
GO

-- Set the user and enable the login 'sa'
ALTER LOGIN sa ENABLE;
ALTER LOGIN sa WITH PASSWORD = 'StrongP@ssword123';
GO

-- Switch to the ProNeighbor2 database
USE ProNeighbor2;
GO


USE [ProNeighbor2]
GO
/****** Object:  Table [dbo].[bookings]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bookings](
	[id] [uniqueidentifier] NOT NULL,
	[service_id] [uniqueidentifier] NOT NULL,
	[receiver_id] [uniqueidentifier] NOT NULL,
	[booking_date] [datetime] NOT NULL,
	[status_id] [varchar](16) NOT NULL,
	[created_at] [datetime] NULL,
	[duration] [int] NOT NULL,
 CONSTRAINT [PK__bookings__3213E83F48B7E99E] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[categories]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categories](
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK__categori__3213E83F543D1088] PRIMARY KEY CLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chat_participants]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat_participants](
	[chat_id] [uniqueidentifier] NOT NULL,
	[user_id] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_chat_participants] PRIMARY KEY CLUSTERED 
(
	[chat_id] ASC,
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chats]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chats](
	[id] [uniqueidentifier] NOT NULL,
	[created_by] [uniqueidentifier] NOT NULL,
	[service_id] [uniqueidentifier] NULL,
	[created_at] [datetime] NULL,
	[is_group] [bit] NULL,
	[chatName] [nvarchar](255) NULL,
 CONSTRAINT [PK__chats__3213E83FA05F9F0B] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[message_status]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[message_status](
	[status] [varchar](16) NOT NULL,
 CONSTRAINT [PK_message_status] PRIMARY KEY CLUSTERED 
(
	[status] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[messages]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[messages](
	[chat_id] [uniqueidentifier] NOT NULL,
	[user_id] [uniqueidentifier] NOT NULL,
	[message] [nvarchar](max) NOT NULL,
	[timestamp] [datetime] NOT NULL,
	[status] [varchar](16) NULL,
 CONSTRAINT [PK_messages] PRIMARY KEY CLUSTERED 
(
	[chat_id] ASC,
	[user_id] ASC,
	[timestamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reviews]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reviews](
	[id] [uniqueidentifier] NOT NULL,
	[service_id] [uniqueidentifier] NOT NULL,
	[rating] [int] NULL,
	[comment] [nvarchar](1000) NULL,
	[created_at] [datetime] NULL,
	[user_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK__reviews__3213E83FEFA5C240] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[role] [varchar](16) NOT NULL,
 CONSTRAINT [PK_roles] PRIMARY KEY CLUSTERED 
(
	[role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[services]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[services](
	[id] [uniqueidentifier] NOT NULL,
	[provider_id] [uniqueidentifier] NOT NULL,
	[category] [varchar](50) NULL,
	[name] [nvarchar](255) NOT NULL,
	[price] [decimal](10, 2) NOT NULL,
	[description] [nvarchar](1000) NULL,
	[location] [nvarchar](255) NULL,
	[created_at] [datetime] NULL,
 CONSTRAINT [PK__services__3213E83F00B7C1BE] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[status]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[status](
	[status] [varchar](16) NOT NULL,
 CONSTRAINT [PK_status] PRIMARY KEY CLUSTERED 
(
	[status] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 07/03/2025 16:51:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [uniqueidentifier] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[email] [nvarchar](255) NOT NULL,
	[hashed_password] [nvarchar](255) NOT NULL,
	[phone] [nvarchar](20) NULL,
	[address] [nvarchar](255) NULL,
	[created_at] [datetime] NULL,
	[roles] [varchar](16) NULL,
 CONSTRAINT [PK__users__3213E83F5B938BF2] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[categories] ([name]) VALUES (N'Accountant')
INSERT [dbo].[categories] ([name]) VALUES (N'Acting Coach')
INSERT [dbo].[categories] ([name]) VALUES (N'Acupuncturist')
INSERT [dbo].[categories] ([name]) VALUES (N'Astrologer')
INSERT [dbo].[categories] ([name]) VALUES (N'Baby Sitter')
INSERT [dbo].[categories] ([name]) VALUES (N'Barber')
INSERT [dbo].[categories] ([name]) VALUES (N'Car Washer')
INSERT [dbo].[categories] ([name]) VALUES (N'Carpenter')
INSERT [dbo].[categories] ([name]) VALUES (N'Chef')
INSERT [dbo].[categories] ([name]) VALUES (N'Chiropractor')
INSERT [dbo].[categories] ([name]) VALUES (N'Cleaner')
INSERT [dbo].[categories] ([name]) VALUES (N'Courier Service')
INSERT [dbo].[categories] ([name]) VALUES (N'Dance Instructor')
INSERT [dbo].[categories] ([name]) VALUES (N'DJ')
INSERT [dbo].[categories] ([name]) VALUES (N'Dog Walker')
INSERT [dbo].[categories] ([name]) VALUES (N'Driver')
INSERT [dbo].[categories] ([name]) VALUES (N'Elderly Caregiver')
INSERT [dbo].[categories] ([name]) VALUES (N'Electrician')
INSERT [dbo].[categories] ([name]) VALUES (N'Event Planner')
INSERT [dbo].[categories] ([name]) VALUES (N'Financial Advisor')
INSERT [dbo].[categories] ([name]) VALUES (N'Fitness Trainer')
INSERT [dbo].[categories] ([name]) VALUES (N'Furniture Assembler')
INSERT [dbo].[categories] ([name]) VALUES (N'Gardener')
INSERT [dbo].[categories] ([name]) VALUES (N'Graphic Designer')
INSERT [dbo].[categories] ([name]) VALUES (N'Hairdresser')
INSERT [dbo].[categories] ([name]) VALUES (N'Handyman')
INSERT [dbo].[categories] ([name]) VALUES (N'Herbalist')
INSERT [dbo].[categories] ([name]) VALUES (N'Home Organizer')
INSERT [dbo].[categories] ([name]) VALUES (N'House Mover')
INSERT [dbo].[categories] ([name]) VALUES (N'Interior Designer')
INSERT [dbo].[categories] ([name]) VALUES (N'IT Support')
INSERT [dbo].[categories] ([name]) VALUES (N'Language Translator')
INSERT [dbo].[categories] ([name]) VALUES (N'Laundry Service')
INSERT [dbo].[categories] ([name]) VALUES (N'Legal Consultant')
INSERT [dbo].[categories] ([name]) VALUES (N'Life Coach')
INSERT [dbo].[categories] ([name]) VALUES (N'Makeup Artist')
INSERT [dbo].[categories] ([name]) VALUES (N'Marketing Consultant')
INSERT [dbo].[categories] ([name]) VALUES (N'Massage Therapist')
INSERT [dbo].[categories] ([name]) VALUES (N'Mechanic')
INSERT [dbo].[categories] ([name]) VALUES (N'Mobile App Developer')
INSERT [dbo].[categories] ([name]) VALUES (N'Music Teacher')
INSERT [dbo].[categories] ([name]) VALUES (N'Nutritionist')
INSERT [dbo].[categories] ([name]) VALUES (N'Painter')
INSERT [dbo].[categories] ([name]) VALUES (N'Personal Shopper')
INSERT [dbo].[categories] ([name]) VALUES (N'Pest Control Specialist')
INSERT [dbo].[categories] ([name]) VALUES (N'Pet Groomer')
INSERT [dbo].[categories] ([name]) VALUES (N'Photographer')
INSERT [dbo].[categories] ([name]) VALUES (N'Plumber')
INSERT [dbo].[categories] ([name]) VALUES (N'Private Investigator')
INSERT [dbo].[categories] ([name]) VALUES (N'Real Estate Agent')
INSERT [dbo].[categories] ([name]) VALUES (N'Roofing Specialist')
INSERT [dbo].[categories] ([name]) VALUES (N'Security Guard')
INSERT [dbo].[categories] ([name]) VALUES (N'Sewing & Tailoring')
INSERT [dbo].[categories] ([name]) VALUES (N'Social Media Manager')
INSERT [dbo].[categories] ([name]) VALUES (N'Speech Therapist')
INSERT [dbo].[categories] ([name]) VALUES (N'Tarot Reader')
INSERT [dbo].[categories] ([name]) VALUES (N'Tattoo Artist')
INSERT [dbo].[categories] ([name]) VALUES (N'Teacher')
INSERT [dbo].[categories] ([name]) VALUES (N'Therapist')
INSERT [dbo].[categories] ([name]) VALUES (N'Tutor')
INSERT [dbo].[categories] ([name]) VALUES (N'Videographer')
INSERT [dbo].[categories] ([name]) VALUES (N'Web Developer')
INSERT [dbo].[categories] ([name]) VALUES (N'Wedding Planner')
INSERT [dbo].[categories] ([name]) VALUES (N'Yoga Instructor')
GO
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'33062c44-c1fe-4c07-b269-00c0f1feddf6', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'9fb39cf5-7cda-4171-913b-18559137a4ce', N'e52a9026-b49c-4f3f-9c4c-88546d225342')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'9fb39cf5-7cda-4171-913b-18559137a4ce', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'69d96888-fe53-4158-a151-1b4b0e3371ff', N'f47fadb7-f319-4d78-a03a-761d86732014')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'69d96888-fe53-4158-a151-1b4b0e3371ff', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'fd7f3589-343b-4b75-a25b-25b17a3acb6d', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'fd7f3589-343b-4b75-a25b-25b17a3acb6d', N'17069bbb-c3a2-48f0-a1fc-5b0ea0690223')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'fd7f3589-343b-4b75-a25b-25b17a3acb6d', N'e52a9026-b49c-4f3f-9c4c-88546d225342')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'fd7f3589-343b-4b75-a25b-25b17a3acb6d', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'a109ba6e-acec-49fd-9644-38b28358c443', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'da83dc8d-07fd-40cb-8290-3bf23da77337', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'378b6b6f-6bd0-49c5-ab72-51611432a6e4', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'378b6b6f-6bd0-49c5-ab72-51611432a6e4', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'da2fe225-8a03-4881-ad55-524d96aed7fc', N'17301df7-e4a6-4ef1-a0c0-23c7d3dfbd08')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'da2fe225-8a03-4881-ad55-524d96aed7fc', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'da2fe225-8a03-4881-ad55-524d96aed7fc', N'716cf2bb-e6c7-46dd-b767-f80656d68922')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'91e5947d-1453-481e-8cc7-5d7ef8d80400', N'd77cba23-c1a4-4e7c-b384-2bd27cdafc07')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'91e5947d-1453-481e-8cc7-5d7ef8d80400', N'cb6f684f-4029-4962-8218-302fd7fd3d79')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'91e5947d-1453-481e-8cc7-5d7ef8d80400', N'dbb0b0f0-a769-4ee7-8ce5-406bc821d12c')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'91e5947d-1453-481e-8cc7-5d7ef8d80400', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'17301df7-e4a6-4ef1-a0c0-23c7d3dfbd08')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'17069bbb-c3a2-48f0-a1fc-5b0ea0690223')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'f47fadb7-f319-4d78-a03a-761d86732014')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'e52a9026-b49c-4f3f-9c4c-88546d225342')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'272d3701-1af0-4967-b15b-d89f085a76e1')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'716cf2bb-e6c7-46dd-b767-f80656d68922')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'e26d6507-a8d2-4098-8710-6d480ff3a0bc', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'e26d6507-a8d2-4098-8710-6d480ff3a0bc', N'272d3701-1af0-4967-b15b-d89f085a76e1')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'17301df7-e4a6-4ef1-a0c0-23c7d3dfbd08')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'f47fadb7-f319-4d78-a03a-761d86732014')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'e52a9026-b49c-4f3f-9c4c-88546d225342')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'716cf2bb-e6c7-46dd-b767-f80656d68922')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'b8ad5d3a-0ec6-4a07-b1df-9861964740f5', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'2dcb1c52-22c9-4725-a6d8-d29b1fc9e919', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'2dcb1c52-22c9-4725-a6d8-d29b1fc9e919', N'17301df7-e4a6-4ef1-a0c0-23c7d3dfbd08')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'2dcb1c52-22c9-4725-a6d8-d29b1fc9e919', N'17069bbb-c3a2-48f0-a1fc-5b0ea0690223')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'2dcb1c52-22c9-4725-a6d8-d29b1fc9e919', N'f47fadb7-f319-4d78-a03a-761d86732014')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'2dcb1c52-22c9-4725-a6d8-d29b1fc9e919', N'e52a9026-b49c-4f3f-9c4c-88546d225342')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'2dcb1c52-22c9-4725-a6d8-d29b1fc9e919', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'2dcb1c52-22c9-4725-a6d8-d29b1fc9e919', N'272d3701-1af0-4967-b15b-d89f085a76e1')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'2dcb1c52-22c9-4725-a6d8-d29b1fc9e919', N'716cf2bb-e6c7-46dd-b767-f80656d68922')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'1c72a4ec-e5ac-405a-9647-f6b6ae10eb60', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'1c72a4ec-e5ac-405a-9647-f6b6ae10eb60', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[chat_participants] ([chat_id], [user_id]) VALUES (N'be741adf-3712-4f1a-be2f-f912bd0d61eb', N'952b94b5-92ac-4594-b5c5-cd32b069e725')
GO
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'33062c44-c1fe-4c07-b269-00c0f1feddf6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-03-05T23:31:33.237' AS DateTime), 0, N'chat')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'9fb39cf5-7cda-4171-913b-18559137a4ce', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-24T12:59:46.517' AS DateTime), 0, N'eric ')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'69d96888-fe53-4158-a151-1b4b0e3371ff', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-22T10:56:21.117' AS DateTime), 0, N'xevi')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'fd7f3589-343b-4b75-a25b-25b17a3acb6d', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-03-04T22:04:02.480' AS DateTime), 0, N'TEST FOR YOUTUBE')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'a109ba6e-acec-49fd-9644-38b28358c443', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', NULL, CAST(N'2025-02-22T10:27:38.323' AS DateTime), 0, N'NIL NEW SERVICE ')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'da83dc8d-07fd-40cb-8290-3bf23da77337', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-22T18:27:09.033' AS DateTime), 0, N'ROJE')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'378b6b6f-6bd0-49c5-ab72-51611432a6e4', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-25T18:49:26.123' AS DateTime), 0, N'XAVIER CHAT ')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'da2fe225-8a03-4881-ad55-524d96aed7fc', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'1b0c31c6-5500-4cbb-81ae-ff11ce0aeae8', CAST(N'2025-02-21T10:44:16.240' AS DateTime), 0, N'First Chat Name Test ')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'91e5947d-1453-481e-8cc7-5d7ef8d80400', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-03-06T14:31:40.910' AS DateTime), 0, N'youssef chat')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-21T16:45:18.363' AS DateTime), 0, N'Hafsa')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'e26d6507-a8d2-4098-8710-6d480ff3a0bc', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-22T09:11:33.627' AS DateTime), 0, N'CHAT WITH YOUSRA ')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-21T11:02:08.410' AS DateTime), 0, N'CHAT WITH TIM ')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'b8ad5d3a-0ec6-4a07-b1df-9861964740f5', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-26T16:47:30.330' AS DateTime), 0, N'NIL')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'2dcb1c52-22c9-4725-a6d8-d29b1fc9e919', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-21T11:49:32.760' AS DateTime), 0, N'TIM CLEANER CHAT ')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'1c72a4ec-e5ac-405a-9647-f6b6ae10eb60', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-24T15:12:51.793' AS DateTime), 0, N'NIL CONVERSA')
INSERT [dbo].[chats] ([id], [created_by], [service_id], [created_at], [is_group], [chatName]) VALUES (N'be741adf-3712-4f1a-be2f-f912bd0d61eb', N'952b94b5-92ac-4594-b5c5-cd32b069e725', NULL, CAST(N'2025-02-24T15:59:49.763' AS DateTime), 0, N'JONA ')
GO
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'33062c44-c1fe-4c07-b269-00c0f1feddf6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'test ', CAST(N'2025-03-05T23:34:42.863' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'69d96888-fe53-4158-a151-1b4b0e3371ff', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'hola', CAST(N'2025-02-22T10:56:30.473' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'fd7f3589-343b-4b75-a25b-25b17a3acb6d', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'HELLO ', CAST(N'2025-03-04T22:04:47.770' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'378b6b6f-6bd0-49c5-ab72-51611432a6e4', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'hello tim ', CAST(N'2025-02-25T18:50:44.100' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'378b6b6f-6bd0-49c5-ab72-51611432a6e4', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'hola nil ', CAST(N'2025-02-25T18:50:51.633' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'378b6b6f-6bd0-49c5-ab72-51611432a6e4', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Hola', CAST(N'2025-02-26T18:39:12.517' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'91e5947d-1453-481e-8cc7-5d7ef8d80400', N'dbb0b0f0-a769-4ee7-8ce5-406bc821d12c', N'ramadan moubarak ', CAST(N'2025-03-06T14:34:05.783' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'91e5947d-1453-481e-8cc7-5d7ef8d80400', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'hola youssef ', CAST(N'2025-03-06T14:31:46.703' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'91e5947d-1453-481e-8cc7-5d7ef8d80400', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'afen a youssef', CAST(N'2025-03-06T14:33:46.390' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'HELLO', CAST(N'2025-02-22T10:22:34.620' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'BYE ', CAST(N'2025-02-22T10:22:45.317' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'IT''S NOT WORKING CORRECTLY ', CAST(N'2025-02-22T10:22:59.037' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'73b99036-9a3c-4844-9046-5dc018280cb9', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'First chat ', CAST(N'2025-02-21T16:45:24.950' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'message from nil ', CAST(N'2025-02-21T16:35:10.757' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'HELLO TIM , I AM NIL ', CAST(N'2025-02-21T19:15:30.343' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'MESSAGE FROM NIL ', CAST(N'2025-02-21T23:30:44.427' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'HOLA ', CAST(N'2025-02-22T18:28:04.860' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'HOLA 2 ', CAST(N'2025-02-22T18:28:13.923' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Hello team!', CAST(N'2025-02-21T11:51:11.837' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Hello How are you !', CAST(N'2025-02-21T11:51:19.797' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'good and you !', CAST(N'2025-02-21T11:51:25.487' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'    Perfect !', CAST(N'2025-02-21T11:51:33.300' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'    Can u please give me a time for the test  !', CAST(N'2025-02-21T11:51:42.857' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'FIRST MESSAGE FROM THE CHAT ', CAST(N'2025-02-21T14:12:21.350' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'ALEEEE IT''S WORKING ', CAST(N'2025-02-21T14:12:57.440' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'test ', CAST(N'2025-02-21T15:41:57.550' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'it''s finally working ', CAST(N'2025-02-21T15:42:06.207' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'test again ', CAST(N'2025-02-21T16:11:40.887' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Next Thing to do is to add poeple to the CHat ', CAST(N'2025-02-21T16:26:59.987' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'CIAO ', CAST(N'2025-02-21T19:14:51.393' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'35fed859-0000-46e2-ac90-8acb0e1115e6', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'HELLO YOUSRA ', CAST(N'2025-02-21T23:29:49.733' AS DateTime), NULL)
INSERT [dbo].[messages] ([chat_id], [user_id], [message], [timestamp], [status]) VALUES (N'1c72a4ec-e5ac-405a-9647-f6b6ae10eb60', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Hola nil ', CAST(N'2025-02-24T15:13:02.710' AS DateTime), NULL)
GO
INSERT [dbo].[reviews] ([id], [service_id], [rating], [comment], [created_at], [user_id]) VALUES (N'083bbaaf-e59f-4b8f-957e-2218221a9db4', N'355aa8a9-5856-4d1c-9a3f-25469a37a322', 5, N'goood ', CAST(N'2025-02-21T19:13:35.430' AS DateTime), N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[reviews] ([id], [service_id], [rating], [comment], [created_at], [user_id]) VALUES (N'2fbb275a-d8e8-46b7-82c2-61ac30f4ad99', N'1b0c31c6-5500-4cbb-81ae-ff11ce0aeae8', 2, N' bueno   nil  - TFO', CAST(N'2025-02-20T16:27:42.433' AS DateTime), N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[reviews] ([id], [service_id], [rating], [comment], [created_at], [user_id]) VALUES (N'280d310c-3e1d-4088-a014-63173ec87026', N'b8ab6636-ae5a-4c2d-acae-54f9011f0e00', 1, N'sdfdsf', CAST(N'2025-02-20T18:39:25.310' AS DateTime), N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[reviews] ([id], [service_id], [rating], [comment], [created_at], [user_id]) VALUES (N'b95263a0-ee7f-48b1-99c4-81a4b6ac0c53', N'1b0c31c6-5500-4cbb-81ae-ff11ce0aeae8', 5, N' GOOD    nil  - TFO', CAST(N'2025-02-20T16:27:52.387' AS DateTime), N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[reviews] ([id], [service_id], [rating], [comment], [created_at], [user_id]) VALUES (N'0d74321d-761e-45c2-9394-9874b3e4709e', N'78fd5c27-0aa5-4969-bbb4-e6d945293206', 1, N'I CAN DELETE THIS COMMENT ', CAST(N'2025-02-26T16:21:49.663' AS DateTime), N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[reviews] ([id], [service_id], [rating], [comment], [created_at], [user_id]) VALUES (N'a10e7731-c0cb-435f-8ea2-b1c8054737e8', N'355aa8a9-5856-4d1c-9a3f-25469a37a322', 5, N' VERY GOOD ', CAST(N'2025-03-04T22:46:13.710' AS DateTime), N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[reviews] ([id], [service_id], [rating], [comment], [created_at], [user_id]) VALUES (N'8912c361-e2e9-4309-9564-d81f58e34524', N'1b0c31c6-5500-4cbb-81ae-ff11ce0aeae8', 3, N' bueno   SERVICE - TFO', CAST(N'2025-02-19T12:44:40.023' AS DateTime), N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[reviews] ([id], [service_id], [rating], [comment], [created_at], [user_id]) VALUES (N'68ab45db-f794-4f91-9dae-eef48db378c4', N'e59d9218-3f9a-4e71-b037-e727a4ff44ec', 1, N'VERY BAD ', CAST(N'2025-02-21T23:27:25.650' AS DateTime), N'952b94b5-92ac-4594-b5c5-cd32b069e725')
INSERT [dbo].[reviews] ([id], [service_id], [rating], [comment], [created_at], [user_id]) VALUES (N'cc7a7529-f36b-40f5-935d-fa386421fa6b', N'1b0c31c6-5500-4cbb-81ae-ff11ce0aeae8', 2, N' bueno   nil  - TFO', CAST(N'2025-02-19T17:53:20.700' AS DateTime), N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed')
GO
INSERT [dbo].[roles] ([role]) VALUES (N'customer')
INSERT [dbo].[roles] ([role]) VALUES (N'provider')
GO
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'db6c9552-fcbc-43fd-885a-1c03ecc1ad2b', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'Astrologer', N'IT''S NIL SERVICE', CAST(3.00 AS Decimal(10, 2)), N'NIL', N'NIL', CAST(N'2025-02-22T10:17:43.630' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'355aa8a9-5856-4d1c-9a3f-25469a37a322', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Cleaner', N'tim', CAST(20.00 AS Decimal(10, 2)), N'third ', N'girona', CAST(N'2025-02-20T16:14:27.157' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'4c1fdbcd-c4cb-43c0-b19a-2c740a4021e4', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'DJ', N'DJ NIL ', CAST(100.00 AS Decimal(10, 2)), N'per todas les festes , stek stek  ', N'olot ', CAST(N'2025-02-17T18:30:40.193' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'8b31e5de-9028-4c45-9556-2ca733ed6bdb', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Chef', N'youssef', CAST(58000.00 AS Decimal(10, 2)), N'description', N'olot', CAST(N'2025-03-06T14:30:34.303' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'8f6a789d-dcbe-4212-8941-2de4deaa3636', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Chef', N'TEST ', CAST(1.00 AS Decimal(10, 2)), N'SDVDSF', N'olot ', CAST(N'2025-02-22T10:02:09.017' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'a8795a64-ac7f-4ef4-b69d-46af4cd7efd4', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Driver', N'permet effectivement à Théodose et à son fils de se retirer dans un monastère. Selon certaines hypothèses, Théodose ', CAST(200.00 AS Decimal(10, 2)), N'varchar(max)', N'aqui', CAST(N'2025-03-06T18:12:24.860' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'b8ab6636-ae5a-4c2d-acae-54f9011f0e00', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Accountant', N'TIM SECOND SERVICE ', CAST(2.00 AS Decimal(10, 2)), N'test ', N'olot ', CAST(N'2025-02-20T13:04:16.200' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'f8a7b19c-3bc3-4fe2-9f17-607e2a6eb788', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'Accountant', N'nil ', CAST(1.00 AS Decimal(10, 2)), N'desc', N'loc', CAST(N'2025-02-17T18:40:45.180' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'1fe4deca-738a-4526-9376-6377eec467c5', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'DJ', N'CLEANING ', CAST(5.00 AS Decimal(10, 2)), N'DESCRIPTION', N'CAMPRODON', CAST(N'2025-03-04T22:05:31.687' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'eadd21f7-4875-4a4e-b8dc-7747e630a228', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'DJ', N'NOUREDDIN ', CAST(24.00 AS Decimal(10, 2)), N'I GIVE NO SERVICE HEHE', N'CAMPRODON', CAST(N'2025-02-22T09:57:17.190' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'd1ad32a6-6827-4c1c-8ade-a48426afcaf0', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Cleaner', N' Cleaning  chimney ok', CAST(4.00 AS Decimal(10, 2)), N'description', N'olot', CAST(N'2025-03-06T18:02:07.760' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'3c714c98-80f4-4736-bf10-b6190c995d68', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Cleaner', N' Cleaning', CAST(3.00 AS Decimal(10, 2)), N'description', N'olot', CAST(N'2025-03-06T18:00:57.950' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'8ac97100-eb6c-4709-b700-be2c5a0886fb', N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'Chef', N'HAFSA', CAST(1400.00 AS Decimal(10, 2)), N'cooking', N'st pau', CAST(N'2025-02-18T10:16:31.173' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'78fd5c27-0aa5-4969-bbb4-e6d945293206', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Tattoo Artist', N'ROGER SERVICE ', CAST(90000000.00 AS Decimal(10, 2)), N'DESCRRIPTION', N'CAMPRODON', CAST(N'2025-02-22T18:29:33.903' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'e59d9218-3f9a-4e71-b037-e727a4ff44ec', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Teacher', N'TEST WITH ANTONIO', CAST(90000.00 AS Decimal(10, 2)), N'TEST ', N'Italy ', CAST(N'2025-02-21T19:14:22.737' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'd2876b90-b331-4283-9344-e91de579b629', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Carpenter', N'SAMENAME', CAST(3.00 AS Decimal(10, 2)), N'DESCRIPTION', N'CAMPRODON', CAST(N'2025-03-05T22:03:55.650' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'd03d4180-8cff-4570-bbf7-f4ca74bc39fc', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'IT Support', N'YOUSRA ', CAST(4.00 AS Decimal(10, 2)), N'TEST WITH YOUSRA', N'TANGER ', CAST(N'2025-02-21T23:28:18.533' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'32a86a87-64b8-4095-998d-fdddce5abafd', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Dance Instructor', N'MILENA', CAST(4.00 AS Decimal(10, 2)), N'DFKNDKN', N'DVDD', CAST(N'2025-02-22T10:03:08.870' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'e0b19cf0-0c94-4f0a-8244-feb633a45dde', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Cleaner', N' Cleaning  chimney', CAST(3.00 AS Decimal(10, 2)), N'description', N'olot', CAST(N'2025-03-06T18:01:47.993' AS DateTime))
INSERT [dbo].[services] ([id], [provider_id], [category], [name], [price], [description], [location], [created_at]) VALUES (N'1b0c31c6-5500-4cbb-81ae-ff11ce0aeae8', N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'Herbalist', N'TIM HACKER ', CAST(90.00 AS Decimal(10, 2)), N'HACKER ', N'OLOT', CAST(N'2025-02-18T23:11:30.913' AS DateTime))
GO
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'b5f48bf7-a148-47ee-9704-083d1ff0deb2', N'test', N'newtest@gmail.com', N'$2b$10$OdUTVbYNm2KVKi4m9XdO0eupmdM0fB8tFRaLKV3ZMLVNSqhU.xkWe', NULL, NULL, CAST(N'2025-03-05T22:05:58.463' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'b4298d8d-368e-497a-8050-213d0813ff1f', N'revisio', N'revisio@gmail.com', N'$2b$10$AgymZcMp8Y7XIHh6YI42FuPHcsYewUVqG8mBooFeQcS2W6ciqFCkC', NULL, NULL, CAST(N'2025-02-25T19:03:22.123' AS DateTime), N'provider')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'bfb2fdf9-07ff-4360-be9e-222c2eaa4aed', N'nil', N'nil@gmail.com', N'$2b$10$mvgR5FPLL6JcT7MN3Ht1Z.IBvMJyEHj06mcTkzOcN6PHeYqUljHN6', NULL, NULL, CAST(N'2025-02-14T16:41:35.383' AS DateTime), N'provider')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'17301df7-e4a6-4ef1-a0c0-23c7d3dfbd08', N'jona LLUIS', N'jona1@gmail.com', N'$2b$10$TOxbHj.TVllzVanBEUHBHOGp8Oc5Dn5qafsu18daLJciAnDLH5TSe', N'0123456789', N'Olot ', CAST(N'2025-02-12T19:55:59.020' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'd77cba23-c1a4-4e7c-b384-2bd27cdafc07', N'chaima', N'chaimaa@gmail.com', N'$2b$10$uMoGoz6nQWh4pSA3ZaSaFO5PrSRYlAXnnSnw/vgXPKA89TsYK.c3a', NULL, NULL, CAST(N'2025-03-05T22:59:40.003' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'cb6f684f-4029-4962-8218-302fd7fd3d79', N'aya', N'aya@gmail.com', N'$2b$10$d4Ms4iIqQ1BIfq7B5UZK0O5oMV7HW9KEBNiaBg/r4vGI50aZrNr7W', NULL, NULL, CAST(N'2025-03-05T22:49:45.927' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'dbb0b0f0-a769-4ee7-8ce5-406bc821d12c', N'chaima', N'chaima@gmail.com', N'$2b$10$JC66XPVgU92Zd5yxsS/gx.fWDa1EYtZLQfQOG390.M80ULeBu9m2m', NULL, NULL, CAST(N'2025-03-05T22:48:08.543' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'efcaa3bb-68dd-4627-9a5c-5187c53f6849', N'youtube', N'youtube@gmail.com', N'$2b$10$mj9KN01a8ExzJxRZBKhM6.oclkVqJcRHlSQuiiutUVNBrXJUIduma', NULL, NULL, CAST(N'2025-03-04T22:39:18.853' AS DateTime), N'provider')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'41f9b067-0bfd-4ac2-bfc8-5608c6177a30', N'youssef', N'yousseffdil@gmail.com', N'$2b$10$zqd8UKY4/2pC/nQDTG.Wp.k3S8CY/vV4Ir4UW17mYkJccRp/v7A4q', NULL, NULL, CAST(N'2025-03-06T14:37:18.277' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'17069bbb-c3a2-48f0-a1fc-5b0ea0690223', N'guillem', N'guillem@gmail.com', N'$2b$10$WxXfzgFRfsQ3EDmftcsQeeRRuIHiFD6edu4hN8K0XjoWWT6zgoeYi', NULL, NULL, CAST(N'2025-02-14T16:42:04.173' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'd4f30162-c61a-4f16-981b-7083649174c7', N'miquel', N'miquel@gmail.com', N'$2b$10$oh3bbT13OopGMq9eou//z.XAktVNaKJVOZfD5tPbj1fXoGRqiloNe', NULL, NULL, CAST(N'2025-03-05T22:14:51.687' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'f47fadb7-f319-4d78-a03a-761d86732014', N'jan', N'jan@gmail.com', N'$2b$10$KMeb47TJvlHynJZX.TKNF.Cmmq0Twm/IQA1BxXoHEuTBWw9798ccW', NULL, NULL, CAST(N'2025-02-14T16:43:21.313' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'91b6c6db-adcc-4b2b-81ab-7b00365ba84e', N'YOUSRA', N'yousra@gmail.com', N'$2b$10$ZrUIb8.KRG7x7UFPMYMXPOQKfl8fUNm9QH.y0MXuqHDZuU4vuvbpi', NULL, NULL, CAST(N'2025-02-21T23:32:21.090' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'6b5fdd48-421e-437f-8f3f-83c4276cbe49', N'nil2', N'tim3@gmail.com', N'$2b$10$Xi1EM/i7tdkyCl87a3QPduz7k8UuFAtHzlN8QQmzQKbfNCkVfGHq.', NULL, NULL, CAST(N'2025-02-26T17:22:11.687' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'e52a9026-b49c-4f3f-9c4c-88546d225342', N'pierre', N'pierre@gmail.com', N'$2b$10$TsCBAhQ.81Iu.2.AhNhZmO6/ZU/vX1.94QkcQDdEoY1.uE5RTjvcy', NULL, NULL, CAST(N'2025-02-14T16:42:41.527' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'fef31b36-46c5-4e97-8bde-8d46be9b8802', N'sara', N'sara@gmai.com', N'$2b$10$//PtptPMNNV02fGGOwnaNuIJQtwIqZulXtmTfCfYxRcpidtSzXkwe', NULL, NULL, CAST(N'2025-02-25T15:28:39.973' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'e903a00a-3dec-4196-b288-a48fcf85e10e', N'tim', N'ftima@gmail.com', N'$2b$10$VbHqR.acXbENYLI3nxQmzOsmOMi/BSFZ3mCyGV8dP9iW31v4ELgNK', NULL, NULL, CAST(N'2025-03-05T22:38:40.047' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'acf49fe0-0ed1-466e-99a4-c86ec0466077', N'serghini', N'serghini@gmail.com', N'$2b$10$/Y3A6d96CgfELxBgWs9VXudzIZmstv7SRkycfUaGMPFqwaOc9DBlS', NULL, NULL, CAST(N'2025-03-05T22:50:43.113' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'952b94b5-92ac-4594-b5c5-cd32b069e725', N'tim', N'tim@gmail.com', N'$2b$10$HBbVme80yIYJs6BvpslldORgqmU8l8h1FBr4Kyl.dimaTRsWuSQW2', N'1111111111', N'olot', CAST(N'2025-02-14T16:42:54.957' AS DateTime), N'provider')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'e18f8299-b1d5-4027-a4bd-d50b5a840201', N'tim', N'fatimae@zerlavalldelter.cat', N'$2b$10$KLifGcPq9Gs2PrET1pJ6dOQxr9v2SWTlYqfvrydShmQJbaDNH3CuK', NULL, NULL, CAST(N'2025-03-05T22:44:08.050' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'272d3701-1af0-4967-b15b-d89f085a76e1', N'youssef', N'youssef@gmail.com', N'$2b$10$oZvild2Qapp7fpk1fiHPA.dG2COixQu6u9UwrJ1LcfRs2FrA63j1S', NULL, NULL, CAST(N'2025-02-14T16:43:42.517' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'8532ddb9-bcee-416b-a9fd-df27dfe4b980', N'nil2', N'tim2@gmail.com', N'$2b$10$eYe.I0yXSOhxUes53gGL/eSzOFLPlIE2Gwh3VkxPCbqV8Ol4WUJwO', NULL, NULL, CAST(N'2025-02-26T17:22:01.607' AS DateTime), N'customer')
INSERT [dbo].[users] ([id], [name], [email], [hashed_password], [phone], [address], [created_at], [roles]) VALUES (N'716cf2bb-e6c7-46dd-b767-f80656d68922', N'lluis', N'lluis@gmail.com', N'$2b$10$5YroU8uqyOGjufOYS55nG.VsX7aB4u4fC82m9plTaDHW8hmbt8WQu', NULL, NULL, CAST(N'2025-02-14T16:42:24.197' AS DateTime), N'customer')
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__categori__72E12F1B76A54952]    Script Date: 07/03/2025 16:51:02 ******/
ALTER TABLE [dbo].[categories] ADD  CONSTRAINT [UQ__categori__72E12F1B76A54952] UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_provider_name]    Script Date: 07/03/2025 16:51:02 ******/
ALTER TABLE [dbo].[services] ADD  CONSTRAINT [UQ_provider_name] UNIQUE NONCLUSTERED 
(
	[provider_id] ASC,
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__users__AB6E61645994E1C1]    Script Date: 07/03/2025 16:51:02 ******/
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [UQ__users__AB6E61645994E1C1] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[bookings] ADD  CONSTRAINT [DF__bookings__id__5BE2A6F2]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[bookings] ADD  CONSTRAINT [DF__bookings__create__5CD6CB2B]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[chats] ADD  CONSTRAINT [DF__chats__id__6E01572D]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[chats] ADD  CONSTRAINT [DF__chats__created_a__6EF57B66]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[chats] ADD  CONSTRAINT [DF__chats__is_group__10566F31]  DEFAULT ((0)) FOR [is_group]
GO
ALTER TABLE [dbo].[messages] ADD  CONSTRAINT [DF__messages__timest__7C4F7684]  DEFAULT (getdate()) FOR [timestamp]
GO
ALTER TABLE [dbo].[reviews] ADD  CONSTRAINT [DF__reviews__id__4CA06362]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[reviews] ADD  CONSTRAINT [DF__reviews__created__4E88ABD4]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[services] ADD  CONSTRAINT [DF__services__id__45F365D3]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[services] ADD  CONSTRAINT [DF__services__create__47DBAE45]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__id__3D5E1FD2]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__created_a__3E52440B]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[bookings]  WITH CHECK ADD  CONSTRAINT [FK__bookings__receiv__5EBF139D] FOREIGN KEY([receiver_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[bookings] CHECK CONSTRAINT [FK__bookings__receiv__5EBF139D]
GO
ALTER TABLE [dbo].[bookings]  WITH CHECK ADD  CONSTRAINT [FK__bookings__servic__5DCAEF64] FOREIGN KEY([service_id])
REFERENCES [dbo].[services] ([id])
GO
ALTER TABLE [dbo].[bookings] CHECK CONSTRAINT [FK__bookings__servic__5DCAEF64]
GO
ALTER TABLE [dbo].[bookings]  WITH CHECK ADD  CONSTRAINT [FK_bookings_status] FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status])
GO
ALTER TABLE [dbo].[bookings] CHECK CONSTRAINT [FK_bookings_status]
GO
ALTER TABLE [dbo].[chat_participants]  WITH CHECK ADD  CONSTRAINT [FK__chat_part__user___04E4BC85] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[chat_participants] CHECK CONSTRAINT [FK__chat_part__user___04E4BC85]
GO
ALTER TABLE [dbo].[chat_participants]  WITH CHECK ADD  CONSTRAINT [FK_chat_participants_chats] FOREIGN KEY([chat_id])
REFERENCES [dbo].[chats] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[chat_participants] CHECK CONSTRAINT [FK_chat_participants_chats]
GO
ALTER TABLE [dbo].[chats]  WITH CHECK ADD  CONSTRAINT [FK__chats__service_i__70DDC3D8] FOREIGN KEY([service_id])
REFERENCES [dbo].[services] ([id])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[chats] CHECK CONSTRAINT [FK__chats__service_i__70DDC3D8]
GO
ALTER TABLE [dbo].[chats]  WITH CHECK ADD  CONSTRAINT [FK_Creator] FOREIGN KEY([created_by])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[chats] CHECK CONSTRAINT [FK_Creator]
GO
ALTER TABLE [dbo].[messages]  WITH CHECK ADD  CONSTRAINT [FK_messages_chat_participants] FOREIGN KEY([chat_id], [user_id])
REFERENCES [dbo].[chat_participants] ([chat_id], [user_id])
GO
ALTER TABLE [dbo].[messages] CHECK CONSTRAINT [FK_messages_chat_participants]
GO
ALTER TABLE [dbo].[messages]  WITH CHECK ADD  CONSTRAINT [FK_messages_chats] FOREIGN KEY([chat_id])
REFERENCES [dbo].[chats] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[messages] CHECK CONSTRAINT [FK_messages_chats]
GO
ALTER TABLE [dbo].[messages]  WITH CHECK ADD  CONSTRAINT [FK_messages_message_status] FOREIGN KEY([status])
REFERENCES [dbo].[message_status] ([status])
GO
ALTER TABLE [dbo].[messages] CHECK CONSTRAINT [FK_messages_message_status]
GO
ALTER TABLE [dbo].[reviews]  WITH CHECK ADD  CONSTRAINT [FK__reviews__service__4F7CD00D] FOREIGN KEY([service_id])
REFERENCES [dbo].[services] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[reviews] CHECK CONSTRAINT [FK__reviews__service__4F7CD00D]
GO
ALTER TABLE [dbo].[reviews]  WITH CHECK ADD  CONSTRAINT [FK_reviews_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[reviews] CHECK CONSTRAINT [FK_reviews_users]
GO
ALTER TABLE [dbo].[services]  WITH CHECK ADD  CONSTRAINT [FK__services__provid__48CFD27E] FOREIGN KEY([provider_id])
REFERENCES [dbo].[users] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[services] CHECK CONSTRAINT [FK__services__provid__48CFD27E]
GO
ALTER TABLE [dbo].[services]  WITH CHECK ADD  CONSTRAINT [FK_services_categories] FOREIGN KEY([category])
REFERENCES [dbo].[categories] ([name])
GO
ALTER TABLE [dbo].[services] CHECK CONSTRAINT [FK_services_categories]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_roles] FOREIGN KEY([roles])
REFERENCES [dbo].[roles] ([role])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_roles]
GO
ALTER TABLE [dbo].[reviews]  WITH CHECK ADD  CONSTRAINT [CK__reviews__rating__4D94879B] CHECK  (([rating]>=(1) AND [rating]<=(5)))
GO
ALTER TABLE [dbo].[reviews] CHECK CONSTRAINT [CK__reviews__rating__4D94879B]
GO
ALTER TABLE [dbo].[roles]  WITH CHECK ADD  CONSTRAINT [CK__roles__role__38996AB5] CHECK  (([role]='customer' OR [role]='provider'))
GO
ALTER TABLE [dbo].[roles] CHECK CONSTRAINT [CK__roles__role__38996AB5]
GO
ALTER TABLE [dbo].[services]  WITH CHECK ADD  CONSTRAINT [CK__services__price__46E78A0C] CHECK  (([price]>=(0)))
GO
ALTER TABLE [dbo].[services] CHECK CONSTRAINT [CK__services__price__46E78A0C]
GO
ALTER TABLE [dbo].[status]  WITH CHECK ADD  CONSTRAINT [CK__status__status__534D60F1] CHECK  (([status]='declined' OR [status]='pending' OR [status]='confirmed'))
GO
ALTER TABLE [dbo].[status] CHECK CONSTRAINT [CK__status__status__534D60F1]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'creator' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'chats', @level2type=N'CONSTRAINT',@level2name=N'FK_Creator'
GO

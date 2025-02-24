USE [master]
GO
/****** Object:  Database [ProNeighbor2]    Script Date: 19/02/2025 11:55:26 ******/
CREATE DATABASE [ProNeighbor2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ProNeighbor2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.NOUREDDINEXPRESS\MSSQL\DATA\ProNeighbor2.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ProNeighbor2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.NOUREDDINEXPRESS\MSSQL\DATA\ProNeighbor2_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ProNeighbor2] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ProNeighbor2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ProNeighbor2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ProNeighbor2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ProNeighbor2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ProNeighbor2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ProNeighbor2] SET ARITHABORT OFF 
GO
ALTER DATABASE [ProNeighbor2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ProNeighbor2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ProNeighbor2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ProNeighbor2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ProNeighbor2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ProNeighbor2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ProNeighbor2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ProNeighbor2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ProNeighbor2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ProNeighbor2] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ProNeighbor2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ProNeighbor2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ProNeighbor2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ProNeighbor2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ProNeighbor2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ProNeighbor2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ProNeighbor2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ProNeighbor2] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ProNeighbor2] SET  MULTI_USER 
GO
ALTER DATABASE [ProNeighbor2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ProNeighbor2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ProNeighbor2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ProNeighbor2] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ProNeighbor2] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ProNeighbor2] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [ProNeighbor2] SET QUERY_STORE = ON
GO
ALTER DATABASE [ProNeighbor2] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ProNeighbor2]
GO
/****** Object:  Table [dbo].[bookings]    Script Date: 19/02/2025 11:55:26 ******/
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
/****** Object:  Table [dbo].[categories]    Script Date: 19/02/2025 11:55:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categories](
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK__categori__3213E83F543D1088] PRIMARY KEY CLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__categori__72E12F1B76A54952] UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chat_participants]    Script Date: 19/02/2025 11:55:26 ******/
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
/****** Object:  Table [dbo].[chats]    Script Date: 19/02/2025 11:55:26 ******/
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
/****** Object:  Table [dbo].[message_status]    Script Date: 19/02/2025 11:55:26 ******/
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
/****** Object:  Table [dbo].[messages]    Script Date: 19/02/2025 11:55:26 ******/
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
/****** Object:  Table [dbo].[reviews]    Script Date: 19/02/2025 11:55:26 ******/
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
/****** Object:  Table [dbo].[roles]    Script Date: 19/02/2025 11:55:26 ******/
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
/****** Object:  Table [dbo].[services]    Script Date: 19/02/2025 11:55:26 ******/
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
/****** Object:  Table [dbo].[status]    Script Date: 19/02/2025 11:55:26 ******/
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
/****** Object:  Table [dbo].[users]    Script Date: 19/02/2025 11:55:26 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__users__AB6E61645994E1C1] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_Users_Email]    Script Date: 19/02/2025 11:55:26 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UQ_Users_Email] ON [dbo].[users]
(
	[phone] ASC
)
WHERE ([phone] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
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
USE [master]
GO
ALTER DATABASE [ProNeighbor2] SET  READ_WRITE 
GO

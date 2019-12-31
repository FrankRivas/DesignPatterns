--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)

-- Started on 2019-12-27 10:39:52 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 17608)
-- Name: new_to_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.new_to_user (
    "newToUserId" integer NOT NULL,
    "sharedBy" integer,
    "createdAt" timestamp without time zone DEFAULT '2019-12-27 16:33:33.436'::timestamp without time zone NOT NULL,
    "newsId" integer,
    "userId" integer
);


ALTER TABLE public.new_to_user OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 17606)
-- Name: new_to_user_newToUserId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."new_to_user_newToUserId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."new_to_user_newToUserId_seq" OWNER TO postgres;

--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 204
-- Name: new_to_user_newToUserId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."new_to_user_newToUserId_seq" OWNED BY public.new_to_user."newToUserId";


--
-- TOC entry 203 (class 1259 OID 17596)
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2019-12-27 16:33:33.436'::timestamp without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    url character varying(256) NOT NULL
);


ALTER TABLE public.news OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 17594)
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_id_seq OWNER TO postgres;

--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 202
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- TOC entry 207 (class 1259 OID 17617)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(256) NOT NULL,
    email character varying(50) NOT NULL,
    "lastLogin" timestamp without time zone DEFAULT '2019-12-27 16:33:33.44'::timestamp without time zone NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2019-12-27 16:33:33.44'::timestamp without time zone NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT '2019-12-27 16:33:33.443'::timestamp without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 17615)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 206
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2858 (class 2604 OID 17611)
-- Name: new_to_user newToUserId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.new_to_user ALTER COLUMN "newToUserId" SET DEFAULT nextval('public."new_to_user_newToUserId_seq"'::regclass);


--
-- TOC entry 2855 (class 2604 OID 17599)
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- TOC entry 2860 (class 2604 OID 17620)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3008 (class 0 OID 17608)
-- Dependencies: 205
-- Data for Name: new_to_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.new_to_user ("newToUserId", "sharedBy", "createdAt", "newsId", "userId") FROM stdin;
2	\N	2019-12-27 04:58:30.408	1	1
3	\N	2019-12-27 04:58:30.408	1	1
4	\N	2019-12-27 04:58:30.408	1	1
6	\N	2019-12-27 07:27:14.479	2	2
7	\N	2019-12-27 07:36:58.753	3	2
8	1	2019-12-27 07:36:58.753	4	2
9	2	2019-12-27 07:44:52.073	4	1
10	2	2019-12-27 15:22:57.8	2	1
5	2	2019-12-27 04:58:30.408	1	1
\.


--
-- TOC entry 3006 (class 0 OID 17596)
-- Dependencies: 203
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, "createdAt", "isActive", url) FROM stdin;
1	2019-12-27 04:53:22.378	t	https://www.theguardian.com/football/2019/dec/26/liverpool-leicester-premier-league-brendan-rodgers-jurgen-klopp
2	2019-12-27 07:27:14.478	t	https://lifehacker.com/how-to-watch-every-nfl-football-game-this-thanksgiving-1840082010
3	2019-12-27 07:36:58.752	t	https://www.cnn.com/2019/11/29/us/john-mckissick-dies-trnd/index.html
4	2019-12-27 07:36:58.752	t	https://www.nytimes.com/2019/11/28/sports/football/on-a-military-base-in-japan-football-as-a-tie-to-home.html
\.


--
-- TOC entry 3010 (class 0 OID 17617)
-- Dependencies: 207
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, email, "lastLogin", "createdAt", "updatedAt", "isActive") FROM stdin;
2	frank	$2b$10$pTji.FzAtk6CjDwGG5Bfe.MnQNjZ.py4nurU/3mPYv63bTqQzrmWm	frank@gmail.com	2019-12-27 06:50:57.027	2019-12-27 06:50:57.027	2019-12-27 06:50:57.027	t
3	kevin	$2b$10$dKmFCOnArWhEhZ7cmqPdL.WKN0SObrs01d1z.j7DCekgGpyhhxGW2	kevin@gmail.com	2019-12-27 07:06:26.432	2019-12-27 07:06:26.432	2019-12-27 07:06:26.432	t
4	samuel	$2b$10$ibjqVtn6YMfUO1KT.l9PyeN3ZRDEIPEKDv9LB.KVoMfv/0F1VfmQm	sam@gmail.com	2019-12-27 07:09:14.832	2019-12-27 07:09:14.832	2019-12-27 07:09:14.832	t
5	diana	$2b$10$cCg8T6/Cm0YG4EC33y3J0.4.zvjR0dvhZSLpYWJvsRN/55OgRX1Te	diana@gmail.com	2019-12-27 08:00:44.041	2019-12-27 08:00:44.041	2019-12-27 08:00:44.041	t
6	omar	$2b$10$xLuNk7YAueCDbgLAjKQ98u2rFK.CUyGg0nx1M3kI8tuHzPWlT8DhO	omar@gmail.com	2019-12-27 08:00:44.041	2019-12-27 08:00:44.041	2019-12-27 08:00:44.041	t
7	miriam	$2b$10$gtNY6ksmxfrPcwn2osMxT.LUELpH/Hyd0CwVK3bDV06h3/vtUrpu2	miriam@gmail.com	2019-12-27 08:07:49.891	2019-12-27 08:07:49.891	2019-12-27 08:07:49.891	t
8	maria	$2b$10$VnlAhC2fhzSgJ56KmiEtVuC87nWcFsyph7IYxxQtoscBXDVehC8c.	maria@gmail.com	2019-12-27 08:08:31.377	2019-12-27 08:08:31.378	2019-12-27 08:08:31.378	t
9	marta	$2b$10$dNu.yFB/clgd89oyJu8k9edbjbPgPslZ6r0CqyxWtI7KrKs/uo.rG	marta@gmail.com	2019-12-27 08:10:25.311	2019-12-27 08:10:25.311	2019-12-27 08:10:25.311	t
12	simon	$2b$10$PZTWLahd.p4J44nRdz38vuXmfN0.GzyAod3b5.gXtq51MOOqxWIwq	simon@gmail.com	2019-12-27 14:26:04.966	2019-12-27 14:26:04.966	2019-12-27 14:26:04.966	t
13	simosn	$2b$10$0tT47r1WcAJWBDKF/zFx6.2uNE0Y.tXYoRaXSy25CPu2A91uYjk1a	simosn@gmail.com	2019-12-27 15:58:50.348	2019-12-27 15:58:50.348	2019-12-27 15:58:50.348	t
14	jacky	$2b$10$xP7p3dC4hHqjjP99OGq20ub5mcelWo7w3erIwePuQn6OstklCShku	jacky@gmail.com	2019-12-27 16:21:34.409	2019-12-27 16:21:34.409	2019-12-27 16:21:34.409	t
15	jaqueline	$2b$10$XdJRAj38M3awTXOEYKGIruGB56n6kfMKVRDtUvA58AqjKPX8WHJya	jaqueline@gmail.com	2019-12-27 16:24:49.771	2019-12-27 16:24:49.771	2019-12-27 16:24:49.771	t
16	michelle	$2b$10$QDtHRutaq7wh9sscGhaKueIPazwj/crufi.eUyMfCR2K0TeVCVZD.	michelle@gmail.com	2019-12-27 16:27:45.877	2019-12-27 16:27:45.877	2019-12-27 16:27:45.877	t
1	benjamin	$2b$10$HL0xNv8klMQf0g9Qulo89e2g1HbIgegMnmWntbjAOMrJYtrj9C4HG	benjamin@gmail.com	2019-12-27 04:51:47.441	2019-12-27 04:51:47.441	2019-12-27 04:51:47.441	t
\.


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 204
-- Name: new_to_user_newToUserId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."new_to_user_newToUserId_seq"', 10, true);


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 202
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 4, true);


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 206
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- TOC entry 2872 (class 2606 OID 17630)
-- Name: users Duplicate email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Duplicate email" UNIQUE (email);


--
-- TOC entry 2874 (class 2606 OID 17628)
-- Name: users Duplicate username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Duplicate username" UNIQUE (username);


--
-- TOC entry 2866 (class 2606 OID 17603)
-- Name: news PK_39a43dfcb6007180f04aff2357e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY (id);


--
-- TOC entry 2876 (class 2606 OID 17626)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 2870 (class 2606 OID 17614)
-- Name: new_to_user PK_b1d91ca825f3d5cdb33d7a170f8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.new_to_user
    ADD CONSTRAINT "PK_b1d91ca825f3d5cdb33d7a170f8" PRIMARY KEY ("newToUserId");


--
-- TOC entry 2868 (class 2606 OID 17685)
-- Name: news UQ_824cf2fe42ed976967662627063; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "UQ_824cf2fe42ed976967662627063" UNIQUE (url);


--
-- TOC entry 2877 (class 2606 OID 17631)
-- Name: new_to_user FK_10bb14da6bb37c60f6d7c2ec1a4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.new_to_user
    ADD CONSTRAINT "FK_10bb14da6bb37c60f6d7c2ec1a4" FOREIGN KEY ("newsId") REFERENCES public.news(id);


--
-- TOC entry 2878 (class 2606 OID 17636)
-- Name: new_to_user FK_fb372d27bdf4ba922e3ab91fc92; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.new_to_user
    ADD CONSTRAINT "FK_fb372d27bdf4ba922e3ab91fc92" FOREIGN KEY ("userId") REFERENCES public.users(id);


-- Completed on 2019-12-27 10:39:52 CST

--
-- PostgreSQL database dump complete
--


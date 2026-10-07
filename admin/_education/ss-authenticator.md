---
title: "Software Security — Authenticator"
title_pt: "Segurança de Software — Authenticator"
subtitle: Cookie-based authentication
subtitle_pt: Autenticação baseada em cookies
parent: nova-fct             # shown inside the degree page instead of the main timeline
tags: [project]
start: "2020-04"
end: "2020-05"
location: NOVA FCT
cover: /images/education/ss-authenticator/cover.png
summary: A cookie-based authentication component served over TLS, with SQLite or MariaDB storage.
summary_pt: Um componente de autenticação baseado em cookies, servido sobre TLS, com armazenamento em SQLite ou MariaDB.
tech: [Java, Tomcat, TLS, SQLite, MariaDB]
links:
  - label: Source code (GitHub)
    label_pt: Código-fonte (GitHub)
    url: https://github.com/rfa-lopes/SS-TP1
---
First assignment of the **Software Security** course: an **authenticator** — the component of an application's security infrastructure responsible for authentication, i.e. for convincing the system that an actor really acts under the authority of a given principal.

It uses **cookie-based authentication**, runs over **TLS** and stores its data in SQLite (ready to run) or MariaDB.

{% comment %}
  TODO — add screenshots of the login flow.
  ![Login page](/images/education/ss-authenticator/login.png)
{% endcomment %}

<!--pt-->

Primeiro trabalho da cadeira de **Segurança de Software**: um **authenticator** — o componente da infraestrutura de segurança de uma aplicação responsável pela autenticação, ou seja, por convencer o sistema de que um ator age de facto sob a autoridade de um determinado principal.

Usa **autenticação baseada em cookies**, corre sobre **TLS** e guarda os dados em SQLite (pronto a usar) ou MariaDB.

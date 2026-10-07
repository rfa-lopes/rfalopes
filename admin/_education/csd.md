---
title: Dependability of Distributed Systems
title_pt: Confiabilidade de Sistemas Distribuídos
subtitle: Homomorphic encryption with Byzantine fault tolerance
subtitle_pt: Encriptação homomórfica com tolerância a falhas bizantinas
parent: nova-fct             # shown inside the degree page instead of the main timeline
tags: [project]
start: "2020-03"              # taken from the GitHub repository dates — adjust if needed
end: "2020-06"
location: NOVA FCT
cover: /images/education/csd/cover.png
summary: A replicated wallet server in Java combining homomorphic encryption with Byzantine fault tolerance. Team of three.
summary_pt: Um servidor de wallet replicado em Java que combina encriptação homomórfica com tolerância a falhas bizantinas. Equipa de três.
highlights:
  - en: "Built in phases: a non-replicated server, then replication, an audit phase and a final iteration."
    pt: "Desenvolvido por fases: servidor não replicado, depois replicação, uma fase de auditoria e uma iteração final."
tech: [Java, Spring, MySQL, Homomorphic encryption, BFT replication]
links:
  - label: Source code (GitHub)
    label_pt: Código-fonte (GitHub)
    url: https://github.com/rfa-lopes/CSD
---
Course project for **Dependability of Distributed Systems** (CSD), done in a team of three.

We built a wallet server in Java (Spring + MySQL) and evolved it in phases — first a non-replicated server, then a replicated architecture tolerant to **Byzantine faults**, then an audit phase and a final iteration — while protecting the data with **homomorphic encryption**.

{% comment %}
  TODO — add screenshots / architecture diagrams.
  ![Architecture](/images/education/csd/architecture.png)
{% endcomment %}

<!--pt-->

Projeto da cadeira de **Confiabilidade de Sistemas Distribuídos** (CSD), feito em equipa de três.

Construímos um servidor de wallet em Java (Spring + MySQL) e evoluímo-lo por fases — primeiro um servidor não replicado, depois uma arquitetura replicada tolerante a **falhas bizantinas**, depois uma fase de auditoria e uma iteração final — protegendo os dados com **encriptação homomórfica**.

FROM mysql

ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_PORT=3306
ENV MYSQL_ROOT_PASSWORD=ssafy
ENV MYSQL_DATABASE=osiopso
ENV MYSQL_USER=ssafy
ENV MYSQL_PASSWORD=ssafy


# COPY ./initdb.d/setDB.sql /docker-entrypoint-initdb.d

# mysql Config Setting (table 소문자, 한국 시간, 한글 깨짐 수정 등 제발돼라)
#RUN echo lower_case_table_names=1 >> /etc/mysql/conf.d/docker.cnf
#RUN echo default-time-zone='+9:00' >> /etc/mysql/conf.d/docker.cnf
#RUN echo collation-server = utf8mb4_unicode_ci >> /etc/mysql/conf.d/docker.cnf
#RUN echo collation-server = utf8mb4_0900_ai_ci >> /etc/mysql/conf.d/docker.cnf
#RUN echo character-set-server = utf8mb4 >> /etc/mysql/conf.d/docker.cnf
#RUN echo skip-character-set-client-handshake >> /etc/mysql/conf.d/docker.cnf
# https://velog.io/@coastby/Docker-gradle%EB%A1%9C-%EB%B9%8C%EB%93%9C%ED%95%98%EC%97%AC-%EB%8F%84%EC%BB%A4%EB%A1%9C-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0
# https://findstar.pe.kr/2022/05/13/gradle-docker-cache/
# https://velog.io/@mooh2jj/Jenkins-pipeline-Docker-SpringBoot%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0

FROM gradle:7.4-jdk11-alpine as builder
WORKDIR /build

# 그래들 파일이 변경되었을 때만 새롭게 의존패키지 다운로드 받게함.
COPY build.gradle settings.gradle /build/
RUN gradle build -x test --parallel --continue  > /dev/null 2>&1 || true

# 빌더 이미지에서 애플리케이션 빌드
COPY . /build
RUN gradle clean build -x test --parallel

# APP
FROM openjdk:11.0-slim
WORKDIR /build

# 빌더 이미지에서 jar 파일만 복사
COPY --from=builder /build/build/libs/osiopso-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

# root 대신 nobody 권한으로 실행
USER nobody
ENTRYPOINT [                                                \
    "java",                                                 \
    "-jar",                                                 \
    "-Djava.security.egd=file:/dev/./urandom",              \
    "-Dsun.net.inetaddr.ttl=0",                             \
    "stackers-0.0.1-SNAPSHOT.jar"              \
]


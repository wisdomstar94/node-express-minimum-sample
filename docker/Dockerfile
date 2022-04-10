# node, mariadb, git, golang 등이 이미 설치된 이미지로 부터 진행
# https://github.com/wisdomstar94/my_ubuntu_20_04_Docker
FROM wisdomstar94/my_ubuntu_20_04:release-latest

# git clone 받기
RUN mkdir /home2
RUN mkdir /home2/projects
WORKDIR /home2/projects
RUN /usr/local/git/bin/git clone https://github.com/wisdomstar94/node-express-minimum-sample.git

# npm
WORKDIR /home2/projects/node-express-minimum-sample
# RUN npm i

# Copy
COPY docker/sh/copy_home2_to_home.sh /sh/copy_home2_to_home.sh

# 루트 경로로 이동
WORKDIR /

# 컨테이너가 시작될 때마다 실행할 명령어(커맨드) 설정
CMD ["/bin/bash"]

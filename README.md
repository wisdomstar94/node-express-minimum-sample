#
# node-express-minimum-sample 이미지
1. wisdomstar94/my_ubuntu_20_04:release-latest 이미지 기반 (https://github.com/wisdomstar94/my_ubuntu_20_04_Docker)

<br>
<br>
<br>
 
# docker 사용방법
1. 다음 명령어를 통해 container 생성
```
docker run -i -t -d --privileged -p 9020:9020 -p 3306:3306 -v 호스트경로:/home --name 컨테이너명 wisdomstar94/node-express-minimum-sample:latest 
```

2. 컨테이너로 들어간 다음 다음 명령어 입력
```
source /sh/copy_home2_to_home.sh
```
3. 이제 호스트 os 에서 컨테이너에 있던 node-express-minimum-sample 프로젝트에 접근 가능


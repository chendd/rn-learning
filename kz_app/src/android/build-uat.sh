
echo "开始打包ANDROID"
BASE_DIR=$(cd "$(dirname "$0")"; pwd)
cd $BASE_DIR
./gradlew assembRelease

echo "正在将apk包上传到蒲公英"
curl -F "file=@$BASE_DIR/app/build/outputs/apk/app-release.apk" -F "uKey=dc5ff46ccdeb590c6204432a823f37ec" -F "_api_key=136b1f1c862ac8a08f6bfd817307ea87" http://www.pgyer.com/apiv1/app/upload


Keenan's Weather App

Frontend:
cd frontend
npm install
npm run dev

Backend:
npm install
npx tsc
Compress-Archive -Path .\dist\* -DestinationPath function.zip
Upload function.zip to AWS Lambda 

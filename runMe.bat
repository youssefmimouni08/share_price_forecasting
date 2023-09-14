@echo off

cd .\flask_server\lib
start java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -port 9000 -timeout 15000

cd ..\..
cd .\flask_server\
start python ".\Q&A_Model.py"

cd ..
start npm run server

cd .\worldTree\
start npx live-server



cd ..\client\
start npm run dev

pause
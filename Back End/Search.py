import string,os,math,ast,sys
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from collections import OrderedDict

lemmatizer=WordNetLemmatizer()
stop_words=set(stopwords.words('english'))
path=''
f1=open('Back End/postingList.txt','r')
postingList=ast.literal_eval(f1.read())
f1.close()
f1=open('Back End/documentID.txt','r')
documentID=ast.literal_eval(f1.read())
f1.close()
f1=open('Back End/numOfWordsInDoc.txt','r')
numOfWordsInDoc=ast.literal_eval(f1.read())
f1.close()
documentFreq={}
for i in postingList:
    documentFreq[i]=len(postingList[i])

query=sys.argv[1]
querytf={}
queryidf={}
numOfDocuments=len(documentID)

for term in query.split():
    term=term.lower()
    term=lemmatizer.lemmatize(term)
    term=term.strip(string.punctuation)
    if term not in querytf and term not in stop_words:
        querytf[term]=1
    elif term in querytf and term not in stop_words:
        querytf[term]=querytf[term]+1
    if term not in queryidf and term not in stop_words:
        queryidf[term]=querytf[term]

queryWeights={}
qNormal=len(query.split())
for term in querytf:
    queryWeights[term]=float(querytf[term])/float(qNormal)

numOfQueryTerms=len(querytf)
queryTermsInDoc={}
scoresList={}

for doc in documentID:
    for term in querytf:
        if term in postingList and documentID[doc] in postingList[term]:
            queryTermsInDoc[term]=postingList[term][documentID[doc]]
        else:
            queryTermsInDoc[term]=0.0
    normalizingFactor=0.0
    if documentID[doc] in numOfWordsInDoc:
        normalizingFactor=numOfWordsInDoc[documentID[doc]]
    documentWeights={}
    for i in queryTermsInDoc:
        if queryTermsInDoc[i] !=0.0:
            documentWeights[i]=queryTermsInDoc[i]/normalizingFactor
        else:
            documentWeights[i]=0.0
    score=0.0
    for i in queryidf:
        score=score+(queryWeights[i]*documentWeights[i])
    scoresList[doc]=score
    
if len(scoresList)>20:
    dic = sorted(scoresList.items(),key=lambda x:x[1], reverse=True)[:20]
else:
    dic = sorted(scoresList.items(),key=lambda x:x[1], reverse=True)[:len(scoresList)]
dic=OrderedDict(dic)
for i in dic:
    print(os.path.join(path,i) + ".pdf")
    # print(i,dic[i])

sys.stdout.flush()
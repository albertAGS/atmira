#!groovy
library 'scq-pipeline-library'
binaryPipeline(
    entity: 'CES',
    technology: 'NET',
    post: [
      body: {
        almMail(
          to:'integracionsoportecf@gruposantander.com;luis.martinez@servexternos.gruposantander.com;msanchef@gruposantander.com;Elena.almenara@servexternos.gruposantander.com;EANGULOP@servexternos.gruposantander.com;sergio.perezmolina@servexternos.gruposantander.com',
          subject:'mail pipeline binary SCE_RPIDPAYFRONT',
          content:"ARTIFACT_NEXUS_URL: $ARTIFACT_NEXUS_URL",
          attachLog: 'false')
}
]
)

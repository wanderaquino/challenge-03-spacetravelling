import {getPrismicClient, linkResolver} from "../../services/prismic";

export default async (request, response) => {
    const {token: ref, documentId} = request.query;
    const redirectURL = await getPrismicClient(request)
        .getPreviewResolver(ref,documentId)
        .resolve(linkResolver, "/")

    if (!redirectURL){
        return response.status(401).json({message: "Invalid Token"});
    }

    response.setPreviewData({ref});

    response.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${redirectURL}" />
        <script>window.location.href = '${redirectURL}'</script>
        </head>`
      );
    response.end();

}
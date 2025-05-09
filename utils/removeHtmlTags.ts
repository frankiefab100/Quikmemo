const removeHtmlTags = (html: string) => {
    return html.replace(/(<([^>]+)>)/gi, "");
}

export default removeHtmlTags

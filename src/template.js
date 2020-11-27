class TemplateParse {
  parse(fragment = '', slot) {
    const regex = /\$(.*?)\$/g
    return fragment.replace(regex, (_, p) => slot[p])
  }
}

module.exports = new TemplateParse()

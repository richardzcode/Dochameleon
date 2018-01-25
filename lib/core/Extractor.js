class Extractor {
  extractMetadata(file_content) {
    const { header, content } = this.splitHeader(file_content);
    const metadata = { content: content };
    metadata.brief = this.extractBrief(content);
    header.split('\n')
      .forEach(line => {
        const parts = line.split(':');
        const key = parts[0].trim();
        let value = parts.slice(1).join(':').trim();
        try {
          value = JSON.parse(value);
        } catch(e) {}
        metadata[key] = value;
      });
    return metadata;
  }

  splitHeader(content) {
    const lines = content.split(/\r?\n/);
    if (lines[0] !== '---') { return { header: '', content: content }; }

    for (var i = 1; i < lines.length - 1; i++) {
      if (lines[i] === '---') {
        return {
          header: lines.slice(1, i + 1).join('\n'),
          content: lines.slice(i + 1).join('\n'),
        };
      }
    }

    return { header: '', content: content };
  }

  extractBrief(content) {
    if (!content) { return ''; }

    const splitBrief = content.split('<!--truncate-->');
    if (splitBrief.length > 1) {
      return splitBrief[0].replace(/<.+>/g, '').trim();
    }

    const lines = this.linesForBriefExtraction(content);
    let len = lines[0].length;
    let i = 1;
    for (; i < lines.length; i++) {
      len += lines[i].length;
      if (len > 128) { break; }
    }

    return lines.slice(0, i).join('\n').trim();
  }

  linesForBriefExtraction(content) {
    const lines = content.replace(/<.+>/g, '')
      .split(/\r?\n/);
    const result = [];

    let isCode = false;
    for (var i = 0; i < lines.length; i++) {
      const codeBoundary = lines[i].match(/```/);
      if (codeBoundary) {
        if (!isCode) { result.push('...'); }
        isCode = !isCode;
        continue;
      }
      if (isCode) { continue; }

      result.push(lines[i]);
    }

    return result;
  }
}

module.exports = Extractor;

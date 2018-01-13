class Extractor {
  extractMetadata(file_content) {
    const { header, content } = this.splitHeader(file_content);
    const metadata = { content: content };
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
}

module.exports = Extractor;

const ffmpeg = require('fluent-ffmpeg')
ffmpeg('/path/to/file1.avi')
  .input('/path/to/file2.avi')
  .ffprobe(function(err, data) {
    console.log('file2 metadata:');
    console.dir(data);
  });

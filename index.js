const ffmpeg = require('fluent-ffmpeg')
// const fs = require('fs')
// const stream  = fs.createWriteStream('outputfile.divx')
let timemark = null

const testVideoPath = `/Volumes/DEV BACKUP/Videos/One/CONTENTS/VIDEO/0015QS.MXF`
const audioFileName = testVideoPath
  .split('/')
  .slice(-1)
  .pop()
  .split('.')[0]

const testAudioPath = `/Volumes/DEV BACKUP/Videos/One/CONTENTS/AUDIO/${audioFileName}00.MXF`

console.log('audio:', testAudioPath)

ffmpeg(testVideoPath)
  .input(testAudioPath)
  .inputOptions([
    '-ss 00:00:01',
    '-t 00:00:50',
    // ' -async 1',
    // '-strict -2',
  ])
  // .audioCodec('libmp3lame')
  // .ffprobe((err, data) => {
  //   console.log('audio metadata:')
  //   console.dir(data)
  // })
  // .output('outputfile.mp4')
  // .output(stream)
  // .outputOptions('-vcodec libx264')
  .on('progress', onProgress)
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message)
  })
  .on('end', function() {
    console.log('Processing finished !')
  })
  // .outputOptions(['-c:v libx264'])
  .output(`${__dirname}/.output/${Date.now()}.mp4`)
  .run()

function onProgress(progress){
  if (progress.timemark != timemark) {
    timemark = progress.timemark
    console.log('Time mark: ' + timemark + "...")
  }
}
const getS3ImgUrl = (x) => {
  return `${ process.env.urlS3Image }${ x }`
}

export default getS3ImgUrl
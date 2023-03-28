//checks to make sure a company has a profile image when displaying the company card on the home page.
//it checks the image url and makes sure it exists
//tests it and gives a 200 if it works

export const checkImageURL = (url) => {
  if (!url) return false
  else {
      const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
      return pattern.test(url);
  }
};

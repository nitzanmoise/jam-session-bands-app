

<template>
<section class="footer">
<footer class="myFooter" id="footer-wrapper">
    <div class="footer-icons">
         <a href="https://www.pinterest.com/" class="generic-anchor" target="_blank"><i class="fa fa-pinterest"></i></a>
         <a href="https://www.facebook.com/" class="generic-anchor" target="_blank"><i class="fa fa-facebook"></i></a>
         <a href="https://twitter.com/" class="generic-anchor" target="_blank"><i class="fa fa-twitter"></i></a>
         <a href="http://instagram.com/" class="generic-anchor" target="_blank"><i class="fa fa-instagram"></i></a>
         <a href="https://www.youtube.com/" class="generic-anchor" target="_blank"><i class="fa fa-youtube"></i></a>
         <a href="https://plus.google.com/" class="generic-anchor" target="_blank" ><i class="fa fa-google-plus"></i></a>
     </div>
  <section class="footer-bottom">
        <div class="footer-bottom-wrapper">   
            <i class="fa fa-copyright" role="copyright"></i> 2018 <strong>Tomer preis and Nitzan moise</strong> <span class="footer-bottom-rights"> - All Rights Reserved - </span>
        </div>
  </section>
</footer>
</section>

</template>

<script>
export default {};
</script>

<style scoped>
img {
  max-width: 30%;
  float: left;
  margin: 1.66%;
}

hr {
  margin-left: 1.66%;
  border: 0;
  height: 3px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
}

.myFooter {
  display: flex;
  flex-flow: row wrap;
}

footer {
  background-color: rgb(121, 115, 115);
  font-family: "Raleway", sans-serif;
  color: rgb(214, 214, 214);
  max-width: 100%;
  /* margin-top: auto; */
}
.footer-icons {
  text-align: center;
  font-size: 20px;
  letter-spacing: 5px;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  position: relative;
  margin-top: 15px;
}

.footer-bottom {
  text-align: center;
  color: white;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
}
a {
  color: orange;
  text-decoration: none;
}
a:visited,
a:focus {
  color: white;
}

a:hover {
  color: rgba(255, 255, 255, 0.6);
}
</style>

<template>
  <div>
    <div class="navigation">
      <b-navbar toggleable="lg" type="dark" variant="dark" class="navigationbar">
        <b-navbar-brand class="navbar-brand">로또</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>            
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link class="menu" id="active" to="/">최근 회차</router-link></b-nav-item>
            <b-nav-item><router-link class="menu" to="/check">당첨 확인</router-link></b-nav-item>
            <b-nav-item><router-link class="menu" to="/history">지난 내역</router-link></b-nav-item>
            <b-nav-item><router-link class="menu" to="/setting">더보기</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>
<script>
export default {
  name: "navigation"
};
</script> 
<style>
.navigationbar {
  padding-left: 15px;
}

.menu {
  text-decoration: none;
  color: #7f8c8d;
}

.menu:hover {
  color: seashell;
}
</style>
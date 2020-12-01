<template>
  <div>
    <form name="form" @submit.prevent="handleRegister">
      <div v-if="!successful">
        <div class="form-group">
          <label for="first name">First name</label>
          <input
            v-model="user.firstName"
            v-validate="'required|min:2|max:20'"
            type="text"
            class="form-control"
            name="first name"
          />

          <div
            v-if="submitted && errors.has('first name')"
            class="alert-danger"
          >
            {{ errors.first('first name') }}
          </div>
        </div>
        <div class="form-group">
          <label for="last name">Last name</label>
          <input
            v-model="user.lastName"
            v-validate="'required|min:2|max:20'"
            type="text"
            class="form-control"
            name="last name"
          />
          <div v-if="submitted && errors.has('last name')" class="alert-danger">
            {{ errors.first('last name') }}
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="user.email"
            v-validate="'required|email|max:50'"
            type="email"
            class="form-control"
            name="email"
          />
          <div v-if="submitted && errors.has('email')" class="alert-danger">
            {{ errors.first('email') }}
          </div>
        </div>
        <div class="form-group">
          <label for="nickname">Nickname</label>
          <input
            v-model="user.nickName"
            v-validate="'required|min:2|max:20'"
            type="text"
            class="form-control"
            name="nickname"
          />
          <div v-if="submitted && errors.has('nickname')" class="alert-danger">
            {{ errors.first('nickname') }}
          </div>
        </div>
        <div class="form-group">
          <label for="description">description</label>
          <input
            v-model="user.description"
            v-validate="'required|min:2|max:20'"
            type="text"
            class="form-control"
            name="description"
          />
          <div
            v-if="submitted && errors.has('description')"
            class="alert-danger"
          >
            {{ errors.first('description') }}
          </div>
        </div>
        <div class="form-group">
          <label for="position">position</label>
          <input
            v-model="user.position"
            v-validate="'required|min:2|max:20'"
            type="text"
            class="form-control"
            name="position"
          />
          <div v-if="submitted && errors.has('position')" class="alert-danger">
            {{ errors.first('position') }}
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required|min:6|max:40'"
            type="password"
            class="form-control"
            name="password"
          />
          <div v-if="submitted && errors.has('password')" class="alert-danger">
            {{ errors.first('password') }}
          </div>
        </div>
        <div class="form-group">
          <label for="phone">phone</label>
          <input
            v-model="user.phoneNumb"
            v-validate="'required|length:11'"
            type="text"
            class="form-control"
            name="phone"
          />
          <div v-if="submitted && errors.has('phone')" class="alert-danger">
            {{ errors.first('phone') }}
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">Sign Up</button>
        </div>
      </div>
    </form>

    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
//import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: {},
      submitted: false,
      successful: false,
      message: '',
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
              this.$router.push('/login');
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
.form-group {
  height: 55px;
}
</style>
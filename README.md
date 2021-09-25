# Easy Share

Easy share is an insomnia rest client plugin which provides single click request collection sharing feature. It is very
easy to use.

> ** Still Underdevelopment [ALPHA]**

# How to get it ?

You can download it directly from insomnia plugin hub,
[insomnia-easy-share](https://insomnia.rest/plugins/insomnia-plugin-easy-share)

or you can install it using Preferences Settings,

- Visit, `Menu > Application > Preferences > Plugins`
- Install `insomnia-plugin-easy-share`

# How to configure

Plugin need to configure with a backend server to do this go to `Manage Environments > Base Environement` of your
request collection then add following environment variables,

```json
{
  "_easy_share_server": "https://insomnia-easy-share.herokuapp.com",
  "_easy_share_id": "<collection-name>",
  "_easy_share_pwd": "<collection-password>"
}
```

Sever can be self deployed or you can use `https://insomnia-easy-share.herokuapp.com`.
To self deploy own server use docker image `thilinatlm/insomnia-plugin-easy-share-server`

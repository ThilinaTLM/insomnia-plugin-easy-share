# Easy Share (Insomnia Plugin)

Easy share is an insomnia rest client plugin which provides single click request collection sharing feature. It is very
easy to use.

> ** Still Underdevelopment [ALPHA]**

# How to get it ?

You can download it directly from insomnia plugin hub,
[insomnia-easy-share](https://insomnia.rest/plugins/insomnia-plugin-easy-share)

or you can install it using Preferences Settings,

- Visit, `Menu > Application > Preferences > Plugins`
- Install `insomnia-plugin-easy-share`

![Screenshot_20210925_121818](https://user-images.githubusercontent.com/41065538/134761839-011a0536-2851-4fec-a2fd-2c95e1333f35.png)


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
![Screenshot_20210925_121929](https://user-images.githubusercontent.com/41065538/134761874-a950f282-b94e-4fa6-8eec-9b56c9b9c33c.png)

> Note: This password doesn't protect your data. Anyone who know the id can retrieve data.

# How to use

### Share your collection
First of all configure the request collection according to above section. Then you can click `Share Collection` to push the request collection backend.

![Screenshot_20210925_122246](https://user-images.githubusercontent.com/41065538/134762001-8b014eb7-8d81-49ca-9f22-4d9583194a35.png)

![Screenshot_20210925_122452](https://user-images.githubusercontent.com/41065538/134762038-aa6d0c06-4aa0-48f1-9bd1-de7509824f2a.png)


Then anyone who wants to pull the request collection can use `Insomnia Dashboard > Create > URL` option for retreive data.

![Screenshot_20210925_122913](https://user-images.githubusercontent.com/41065538/134762132-8e8a0687-02ce-4c22-a6cb-59b93f60259b.png)

After that both of them can use `Share Collection` and `Download Collection` feature to pull and push the requestion collection respectively 
to the backend server.

![Screenshot_20210925_123130](https://user-images.githubusercontent.com/41065538/134762175-64e0d30d-fffd-45f9-bfa1-1d061d4589a1.png)


# Self deplyed backend 
You can use `https://insomnia-easy-share.herokuapp.com` as the backend server but it is recommended to use self deplyed server. Because it is not reliable.
To self deploy own server use docker image `thilinatlm/insomnia-plugin-easy-share-server`



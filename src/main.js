const fs = require('fs');
const http = require('http')
const axios = require('axios')
const {
    read_env_and_req_collection, convert_to_current_workspace,
    ENV_VAR_NAME_ID, ENV_VAR_NAME_PWD, ENV_VAR_NAME_SERVER
} = require("./utils")

const {get_request_collection, post_request_collection, get_id_and_pwd} = require('./conn')


/**
 * Workspace Actions
 * @type {[{icon: string, action: (function(*, *): boolean), label: string},
 * {icon: string, action: ((function(*, *): Promise<boolean>)|*), label: string},
 * {icon: string, action: (function(*, *): boolean), label: string}]}
 */
module.exports.workspaceActions = [
    {
        label: 'Generate credentials',
        icon: 'fa-plus-square',
        action: async (context, models) => {
            const {server} = await read_env_and_req_collection(context, models)

            if (!server) {
                context.app.alert("Error",
                    `Sorry,
                        ${ENV_VAR_NAME_SERVER} ${server} is need to be in the base environment.
                        If you have already configured and still showing this message. Please try creating sample
                        request, It will trigger insomnia to refresh base environment to resources
                        `
                )
                return false
            }


            const [status, data] = await get_id_and_pwd(server)
            if (status === 200) {
                context.app.alert("Done",
                    `[ID: "${data.id}" PWD: "${data.pwd}"]
                     You can configure these field in base environment.
                     ${ENV_VAR_NAME_ID}, ${ENV_VAR_NAME_PWD}`
                )
                return true
            }

            context.app.alert(server, data.message)
            return false
        },
    },
    {
        label: 'Share collection',
        icon: 'fa-upload',
        action: async (context, models) => {
            const {request_collection_json, server, id, pwd} = await read_env_and_req_collection(context, models)

            if (!server || !id || !pwd) {
                context.app.alert("Error",
                    `Sorry, 
                        ${ENV_VAR_NAME_SERVER}, ${ENV_VAR_NAME_ID}, ${ENV_VAR_NAME_PWD} 
                        are need to be in the base environment.
                        If you have already configured and still showing this message. Please try creating sample
                        request, It will trigger insomnia to refresh base environment to resources`
                )
                return false
            }

            const [http_code, data] = await post_request_collection(
                request_collection_json,
                {server, id, pwd}
            )

            if (http_code === 200) {
                context.app.alert("Done",
                    `Success, collection can be accesses using SERVER="${server}", ID="${id}"`
                )
                return true
            }

            context.app.alert("Error", data.message)
            return false
        },
    },
    {
        label: 'Download collection',
        icon: 'fa-download',
        action: async (context, models) => {
            const {server, id, request_collection} = await read_env_and_req_collection(context, models)

            if (!server || !id) {
                context.app.alert("Error",
                    `Sorry, 
                        ${ENV_VAR_NAME_SERVER}, ${ENV_VAR_NAME_ID}
                        are need to be in the base environment.
                        If you have already configured and still showing this message. Please try creating sample
                        request, It will trigger insomnia to refresh base environment to resources`
                )
                return false
            }

            const [status, data] = await get_request_collection({server, id})
            if (status === 200) {
                const json = data.data
                // await context.app.alert("Info", json)
                const ret = await context.data.import.raw(json)
                await context.app.alert("Info", "Success, Check your dashboard, it will be there")
                return true
            }

            context.app.alert("Error", data.message)
            return false
        },
    },
    {
        label: 'Fetch collection (to here) (dont)',
        icon: 'fa-download',
        action: async (context, models) => {
            const {server, id, request_collection} = await read_env_and_req_collection(context, models)

            if (!server || !id) {
                context.app.alert("Error",
                    `Sorry, 
                        ${ENV_VAR_NAME_SERVER}, ${ENV_VAR_NAME_ID}
                        are need to be in the base environment.
                        If you have already configured and still showing this message. Please try creating sample
                        request, It will trigger insomnia to refresh base environment to resources`
                )
                return false
            }

            const [status, data] = await get_request_collection({server, id})
            if (status === 200) {
                const json = data.data
                // await context.app.alert("Info", json)
                const converted_json = await convert_to_current_workspace(json, request_collection)
                const ret = await context.data.import.raw(converted_json)
                await context.app.alert("Info", "Success")
                return true
            }

            context.app.alert("Error", data.message)
            return false
        },
    },
];

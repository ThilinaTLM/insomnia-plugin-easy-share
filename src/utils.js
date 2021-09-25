const ENV_VAR_NAME_SERVER = '_easy_share_server';
const ENV_VAR_NAME_ID = '_easy_share_id';
const ENV_VAR_NAME_PWD = '_easy_share_pwd';
const ENV_VAR_NAME_VER = '_easy_share_version';


/**
 * Read environment from request collection
 * @param data
 * @return {{}}
 */
function read_base_environment(data) {
    const filtered = data.resources.filter(r => r.name === 'Base Environment')
    if (filtered.length > 0) {
        return filtered[0].data || ({})
    }
    return ({})
}

/**
 * Export request collection and grab environment variables
 * @param context
 * @param models
 * @return {Promise<{server, request_collection_json: *, request_collection: *, id, pwd}>}
 */
async function read_env_and_req_collection(context, models) {
    const request_collection_json = (await context.data.export.insomnia({
        includePrivate: true,
        format: 'json',
        workspace: models.workspace,
    }))

    const request_collection = JSON.parse(request_collection_json)
    const environment = read_base_environment(request_collection)
    const server = environment[ENV_VAR_NAME_SERVER]
    const id = environment[ENV_VAR_NAME_ID]
    const pwd = environment[ENV_VAR_NAME_PWD]

    return ({request_collection_json, request_collection, server, id, pwd})
}


/**
 * Replace workspace resource with current one
 * @param json
 * @param local_request_collection
 * @return {Promise<string>}
 */
async function convert_to_current_workspace(json, local_request_collection) {
    const workspace = local_request_collection["resources"].filter(r => r['_type'] === 'workspace')[0]
    if (!workspace) return json

    const workspace_id = workspace['_id']
    const online_request_collection = JSON.parse(json)
    const online_workspace = online_request_collection["resources"].filter(r => r['_type'] === 'workspace')[0]
    const converted_request_collection_resources = online_request_collection["resources"]
        .filter(r => r['_type'] !== 'workspace').map(r => {
            if (r.parentId && r.parentId === online_workspace['_id']) {
                return ({...r, parentId: workspace_id})
            }
            return r
        })

    converted_request_collection_resources.push(workspace)
    online_request_collection.resources = converted_request_collection_resources
    return JSON.stringify(online_request_collection)
}



module.exports = {
    read_env_and_req_collection, convert_to_current_workspace,
    ENV_VAR_NAME_ID, ENV_VAR_NAME_PWD, ENV_VAR_NAME_SERVER
}
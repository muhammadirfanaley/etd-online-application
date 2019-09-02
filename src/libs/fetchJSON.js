import fetch from 'isomorphic-fetch'

export function fetchGeneric (url, opts, auth = true) {
  return fetch(url, {
    ...opts,
    headers: {
      ...((opts || {}).isFormData
        ? {}
        : {
          // If content-type is multipart/form-data it should have a boundary,
          // So let browser generate it
          'Content-Type': 'application/json',
        }),
      mode: 'no-cors',
      ...((opts && opts.headers) || {}),
    },
  })
}

export async function fetchJSON (url, opts, auth = true) {
  const res = await fetchGeneric(url, opts, auth)

  if (!res.ok) {
    const err = new Error(`network status error ${res.statusText}`)
    err.status = res.status
    try {
      const json = await res.json()
      if (json) {
        err.body = json
      }
    } catch (e) {
      // ignore if there is no json body
    }
    throw err
  }

  let json
  try {
    json = await res.json()
    if (json.error) {
      const err = new Error('error')
      err.body = json.error
      throw err
    }
  } catch (e) {
    // ignore if response is no json.
  }

  return json
}

export async function uploadFile (url, file, opts) {
  const fileData = new FormData()
  fileData.append('file', file)
  const json = await fetchJSON(url, {
    method: 'POST',
    isFormData: true,
    body: fileData,
    ...opts,
  })

  return json.body || json
}

export async function uploadMultiFiles (url, files, opts) {
  const fileData = new FormData()
  files.forEach(element => {
    fileData.append('files', element)
  })
  const json = await fetchJSON(url, {
    method: 'POST',
    isFormData: true,
    body: fileData,
    ...opts,
  })
  return json.body || json
}
export async function download (url) {
  // We have to call fetch directly, as the shared utils in libs/fetch do not handle non-json responses
  const res = await fetchGeneric(url, { method: 'GET' })
  return {
    response: res,
    ok: res.ok,
    blobURL: URL.createObjectURL(await res.blob()),
  }
}

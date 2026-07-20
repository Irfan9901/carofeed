const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const BUCKET = process.env.SUPABASE_BUCKET || 'cardio_category_image';

let supabase = null;

function getClient() {
  if (!supabase) {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.warn('supabase: missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
      return null;
    }
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { persistSession: false },
    });
  }
  return supabase;
}

async function uploadImage(styleId, base64DataUrl) {
  const client = getClient();
  if (!client) return null;
  const matches = base64DataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) return null;
  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const filePath = `${styleId}.${ext}`;

  const { error } = await client.storage.from(BUCKET).upload(filePath, buffer, {
    contentType: `image/${ext}`,
    upsert: true,
  });
  if (error) throw new Error('Supabase upload: ' + error.message);

  const { data: publicUrl } = client.storage.from(BUCKET).getPublicUrl(filePath);
  return publicUrl.publicUrl;
}

async function deleteImage(styleId) {
  const client = getClient();
  if (!client) return;
  const { data: files } = await client.storage.from(BUCKET).list();
  const file = files?.find((f) => f.name.startsWith(styleId + '.'));
  if (file) {
    await client.storage.from(BUCKET).remove([file.name]);
  }
}

async function listFiles() {
  const client = getClient();
  if (!client) return [];
  const { data } = await client.storage.from(BUCKET).list();
  return data || [];
}

module.exports = { uploadImage, deleteImage, listFiles };

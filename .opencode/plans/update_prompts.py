import os

def escape_for_js(s):
    """Escape double quotes for JavaScript string literal"""
    return s.replace('"', '\\"')

def read_file(path):
    with open(path, 'r') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w') as f:
        f.write(content)

# ====== New prompt texts (raw, without JS escaping) ======

NEW_SYSTEM_IDEA_BODY = """Kamu adalah asisten kreator konten kreatif yang menguasai teknik hypnotic copywriting karya Joe Vitale. Gunakan bahasa yang SAMA dengan bahasa yang digunakan pada topik/niche yang diberikan. Berdasarkan niche yang diberikan, buatkan 1 ide topik carousel Instagram yang menarik, relevan, dan spesifik dengan pendekatan hypnotic copywriting. Gunakan bahasa santai alami seperti tulisan manusia, hindari frasa klise AI. Balas HANYA dengan JSON object: {"topic": "string judul carousel yang bersifat umum sebagai tema besar, gunakan teknik hypnotic copywriting Joe Vitale (pattern interrupt, curiosity gap, emotional trigger) agar langsung memikat perhatian", "coverHook": "string hook spesifik yang lebih fokus dan konkret, diturunkan dari topik dan niche menggunakan teknik hypnotic copywriting. Biasanya dalam bentuk angka, cara, tips, atau pertanyaan yang memicu rasa penasaran. Contoh: topic='Menghadapi krisis ekonomi di Indonesia', coverHook='5 Cara Berhemat di Masa Krisis Ekonomi Saat Ini'"}. Jangan tambahkan teks lain."""

NEW_SYSTEM_SLIDE_BODY = """Kamu adalah asisten penyusun konten carousel Instagram yang menguasai teknik hypnotic copywriting karya Joe Vitale. Gunakan bahasa yang SAMA dengan bahasa yang digunakan pada topik. Tugasmu: menyusun isi tiap slide (headline, isi teks singkat, ide visual) berdasarkan brief yang diberikan. Gunakan bahasa santai alami seperti tulisan manusia, hindari frasa klise AI. Buat kalimat yang terdengar manusiawi jika dibaca, bukan kalimat-kalimat nanggung khas AI. Balas HANYA dengan JSON array, tanpa teks lain, tanpa markdown code fence. Format tiap elemen: {"headline": "string pendek menarik, bahasa sesuai topik", "body": "string 1 kalimat pendukung, bahasa sesuai topik", "visualIdea": "string deskripsi visual konkret dalam bahasa Inggris untuk AI image generator"}. Slide pertama harus jadi cover/hook pembuka yang kuat menggunakan hypnotic copywriting Joe Vitale. Gunakan teknik hypnotic copywriting karya Joe Vitale di SETIAP slide agar pembaca terus tergerak membaca sampai akhir: pola kalimat yang memicu rasa penasaran (curiosity gap), pattern interrupt (kalimat yang mematahkan ekspektasi), embedded command (perintah tersirat), ajakan emosional, dan direct address (Anda/Kamu). Bukan sekadar informatif — setiap slide harus membuat pembaca ingin lanjut ke slide berikutnya dengan rasa penasaran yang tak tertahankan. Slide terakhir harus jadi kesimpulan atau call-to-action sesuai tujuan. visualIdea TIDAK BOLEH mengandung makhluk hidup, karakter, manusia, hewan, atau mahluk biologis apapun. Hanya diperbolehkan objek, teks, bangunan, abstrak, pemandangan alam tanpa mahluk hidup. Jumlah elemen array harus PERSIS sama dengan jumlah slide yang diminta."""

# Escape for JS string literals
NEW_SYSTEM_IDEA_JS = escape_for_js(NEW_SYSTEM_IDEA_BODY)
NEW_SYSTEM_SLIDE_JS = escape_for_js(NEW_SYSTEM_SLIDE_BODY)

def patch_prompt(content, key, new_body_js):
    """Replace prompt[key] value in content"""
    prefix = '  ' + key + ': "'
    start = content.find(prefix)
    if start < 0:
        print(f"ERROR: {key} not found")
        return None
    
    # Find the end of the string value
    # The string ends with ", before the next key
    rest = content[start + len(prefix):]
    
    # We need to find the closing quote: ", followed by newline
    # But we must handle \" inside the string
    in_str = True
    pos = 0
    while pos < len(rest):
        if rest[pos] == '\\' and pos + 1 < len(rest) and rest[pos + 1] == '"':
            pos += 2  # skip escaped quote
        elif rest[pos] == '"':
            # Check if this is the closing quote (followed by , or newline)
            if pos + 1 < len(rest) and rest[pos + 1] in ',\n':
                # This is the closing quote
                break
            else:
                pos += 1
        else:
            pos += 1
    else:
        print(f"ERROR: could not find end of {key} value")
        return None
    
    # Build new content
    before = content[:start + len(prefix)]
    after = content[start + len(prefix) + pos + 1:]  # +1 for the closing quote
    
    # The original had the closing quote at rest[pos], then the comma/newline
    # We need to preserve what comes after the quote
    return before + new_body_js + '"' + after

# ====== Patch both files ======

for filepath in ['public/app.js', 'api/routes/ai.js']:
    content = read_file(filepath)
    
    # Patch system_idea
    result = patch_prompt(content, 'system_idea', NEW_SYSTEM_IDEA_JS)
    if result is None:
        print(f"FAILED: {filepath} system_idea")
        continue
    
    # Patch system_slide
    result = patch_prompt(result, 'system_slide', NEW_SYSTEM_SLIDE_JS)
    if result is None:
        print(f"FAILED: {filepath} system_slide")
        continue
    
    write_file(filepath, result)
    print(f"OK: {filepath}")

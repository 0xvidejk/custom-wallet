// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs::{create_dir_all, File};
use std::fs::{read_dir, ReadDir};
use std::fs::read_to_string;
use std::io::Write;
use std::time::{SystemTime, UNIX_EPOCH};
use serde_json::json;
use serde_json::Value;
use dirs;

#[tauri::command]
fn create_user_profile(user_name: String, password_hash: String, encrypted_wallet_data: String) -> Result<String, String> {
  // Get the current timestamp
  let created_timestamp = SystemTime::now()
      .duration_since(UNIX_EPOCH)
      .expect("Time went backwards")
      .as_secs();

  // Create the JSON structure
  let data = json!({
      "createdTimestamp": created_timestamp,
      "profileName": user_name,
      "passwordHash": password_hash,
      "encryptedWalletData": encrypted_wallet_data,
      "wallets": [] 
  });

  // Determine the base directory based on the operating system
  let mut base_dir = match dirs::home_dir() {
      Some(path) => path,
      None => return Err("Could not find home directory".to_string()),
  };

  if cfg!(target_os = "linux") {
      base_dir.push("CustomWalletData");
  } else if cfg!(target_os = "windows") {
      base_dir = match dirs::data_dir() {
          Some(path) => path.join("CustomWalletData"),
          None => return Err("Could not find AppData directory".to_string()),
      };
  }

  match create_dir_all(&base_dir) {
    Ok(_) => {},
    Err(e) => return Err(e.to_string()),
}

  match read_dir(&base_dir) {
    Ok(mut dir) => {
        if dir.next().is_some() {
            return Err("User profile already exists. Try to log in.".to_string());
        }
    },
    Err(e) => return Err(e.to_string()),
}

  // Create the directory
  let user_dir = base_dir.join(&user_name);
  match create_dir_all(&user_dir) {
      Ok(_) => (),
      Err(e) => return Err(e.to_string()),
  }

  // Create the JSON file
  let mut file = match File::create(user_dir.join("profile.json")) {
      Ok(file) => file,
      Err(e) => return Err(e.to_string()),
  };

  // Write the JSON data to the file
  match file.write_all(data.to_string().as_bytes()) {
      Ok(_) => (),
      Err(e) => return Err(e.to_string()),
  }

  Ok(user_name)
}

#[tauri::command]
fn get_user_profile() -> Result<Option<Value>, String> {
  // Determine the base directory based on the operating system
  let mut base_dir = match dirs::home_dir() {
      Some(path) => path,
      None => return Err("Could not find home directory".to_string()),
  };

  if cfg!(target_os = "linux") {
      base_dir.push("CustomWalletData");
  } else if cfg!(target_os = "windows") {
      base_dir = match dirs::data_dir() {
          Some(path) => path.join("CustomWalletData"),
          None => return Err("Could not find AppData directory".to_string()),
      };
  }

  // Get the first directory in the CustomWalletData directory
  let mut dirs: ReadDir = match read_dir(&base_dir) {
      Ok(dirs) => dirs,
      Err(e) => return Err(e.to_string()),
  };
  let user_dir = match dirs.next() {
      Some(Ok(dir)) => dir.path(),
      Some(Err(e)) => return Err(e.to_string()),
      None => return Err("No user profile found".to_string()),
  };

  // Construct the path to the profile.json file
  let profile_path = user_dir.join("profile.json");

  // Read the file
  let file_content = match read_to_string(&profile_path) {
      Ok(content) => content,
      Err(e) => return Err(e.to_string()),
  };

  // Parse the JSON data
  let data: Value = match serde_json::from_str(&file_content) {
      Ok(data) => data,
      Err(e) => return Err(e.to_string()),
  };

  Ok(Some(data))
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![create_user_profile, get_user_profile])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

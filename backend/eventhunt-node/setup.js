import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function setupProject() {
  console.log('🚀 Setting up EventHunt Backend...\n');
  
  try {
    // Check if node_modules exists
    console.log('📦 Checking dependencies...');
    
    // Install dependencies
    console.log('📥 Installing dependencies...');
    const { stdout, stderr } = await execAsync('npm install');
    
    if (stderr) {
      console.log('⚠️  Installation warnings:', stderr);
    }
    
    console.log('✅ Dependencies installed successfully!');
    console.log('\n🎉 Setup complete! You can now run: npm start');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 Try running these commands manually:');
    console.log('   npm init -y');
    console.log('   npm install sequelize pg pg-hstore bcryptjs jsonwebtoken cors dotenv express');
  }
}

setupProject();
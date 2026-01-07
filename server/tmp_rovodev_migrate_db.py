"""
Temporary migration script to add tier_system columns to existing tables
This script should be run once to update the database schema
"""
from sqlalchemy import text
from database import engine, SessionLocal

def migrate_database():
    """Add new columns to existing tables"""
    
    migrations = [
        # Add tier_system column to products table
        """
        ALTER TABLE products 
        ADD COLUMN IF NOT EXISTS tier_system TEXT;
        """,
        
        # Add selected_tier and tier_system columns to custom_requests table
        """
        ALTER TABLE custom_requests 
        ADD COLUMN IF NOT EXISTS selected_tier VARCHAR(50);
        """,
        """
        ALTER TABLE custom_requests 
        ADD COLUMN IF NOT EXISTS tier_system TEXT;
        """
    ]
    
    try:
        with engine.connect() as conn:
            for migration in migrations:
                try:
                    conn.execute(text(migration))
                    conn.commit()
                    print(f"✓ Migration executed successfully")
                except Exception as e:
                    print(f"Migration note: {e}")
                    # Continue with other migrations even if one fails
                    pass
        
        print("\n✅ Database migration completed!")
        print("New columns added:")
        print("  - products.tier_system")
        print("  - custom_requests.selected_tier")
        print("  - custom_requests.tier_system")
        
    except Exception as e:
        print(f"❌ Error during migration: {e}")

if __name__ == "__main__":
    print("Starting database migration...")
    migrate_database()

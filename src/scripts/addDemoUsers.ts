
import { supabase } from '@/integrations/supabase/client';

/**
 * This script is only for development purposes
 * Run it once to create demo users if needed
 */
export const createDemoUsers = async () => {
  try {
    // Add customer user
    const { data: customerData, error: customerError } = await supabase.auth.signUp({
      email: 'customer@campuseats.com',
      password: 'Customer123!@#',
      options: {
        data: {
          first_name: 'John',
          last_name: 'Student',
          role: 'customer'
        }
      }
    });
    
    if (customerError) throw customerError;
    console.log('Created customer demo user:', customerData);
    
    // Add shop owner user
    const { data: shopData, error: shopError } = await supabase.auth.signUp({
      email: 'shop@campuseats.com',
      password: 'Shop123!@#',
      options: {
        data: {
          first_name: 'Jane',
          last_name: 'Owner',
          role: 'shop'
        }
      }
    });
    
    if (shopError) throw shopError;
    console.log('Created shop demo user:', shopData);
    
    return { success: true };
  } catch (error) {
    console.error('Error creating demo users:', error);
    return { success: false, error };
  }
};

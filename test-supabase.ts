/**
 * Test file to verify Supabase integration functionality
 * This can be run in environments with network access to validate the integration
 */

import { getSearchHistory, saveSearchQuery, clearSearchHistory } from './utils/supabaseHistory';

/**
 * Test function to verify Supabase operations
 * Run this in a browser console or testing environment with network access
 */
export async function testSupabaseIntegration() {
  console.log('🧪 Testing Supabase Integration...');
  
  try {
    // Test 1: Clear existing history
    console.log('1. Clearing existing history...');
    await clearSearchHistory();
    
    // Test 2: Add some test queries
    console.log('2. Adding test search queries...');
    const testQueries = ['react', 'javascript', 'typescript', 'next.js', 'supabase'];
    
    for (const query of testQueries) {
      const success = await saveSearchQuery(query);
      console.log(`   - Saved "${query}": ${success ? '✅' : '❌'}`);
    }
    
    // Test 3: Retrieve history
    console.log('3. Retrieving search history...');
    const history = await getSearchHistory();
    console.log('   Retrieved history:', history);
    
    // Test 4: Verify order (should be most recent first)
    if (history.length === testQueries.length) {
      const isCorrectOrder = history.every((item, index) => 
        item === testQueries[testQueries.length - 1 - index]
      );
      console.log(`   Order verification: ${isCorrectOrder ? '✅' : '❌'}`);
    }
    
    // Test 5: Test duplicate handling
    console.log('4. Testing duplicate handling...');
    await saveSearchQuery('react'); // Should move to top, not duplicate
    const updatedHistory = await getSearchHistory();
    const reactCount = updatedHistory.filter(item => item === 'react').length;
    console.log(`   Duplicate test (should be 1): ${reactCount === 1 ? '✅' : '❌'}`);
    console.log(`   React is at top: ${updatedHistory[0] === 'react' ? '✅' : '❌'}`);
    
    console.log('🎉 Supabase integration test completed!');
    return true;
    
  } catch (error) {
    console.error('❌ Supabase integration test failed:', error);
    return false;
  }
}

// Instructions for manual testing
console.log(`
📋 Manual Testing Instructions:

1. Ensure the Supabase table is set up using supabase_table_setup.sql
2. Run this test in a browser console: testSupabaseIntegration()
3. Verify that queries are stored in the Supabase dashboard
4. Test the app manually by:
   - Entering search queries
   - Checking autocomplete suggestions
   - Verifying persistence across browser sessions

Environment Variables Required:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
`);